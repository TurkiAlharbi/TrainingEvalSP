template = `
<div>
    <div class="container" style="text-align:left">
        <p v-show="false">{{ info.demo }}</p>
        <p v-if="info.students">Number of students: {{ info.students }}</p>
        <p v-if="info.contracts">Number of submitted contracts: {{ info.contracts }}</p>

        <p v-if="info.supervisors">Number of supervisors: {{ info.supervisors }}</p>

        <p v-if="info.coordinators">Number of coordinators: {{ info.coordinators }}</p>
        <p v-if="info.advisors">Number of advisors, including advising coordinators: {{ info.advisors }}</p>

        <p v-if="info.forms">Number of evaluation forms: {{ info.forms }}</p>
        <p v-if="info.submissions">Number of evaluation submissions: {{ info.submissions }}</p>

        <div v-if="info.majors">
            <span>Majors:
                <ul>
                    <li v-for="major in Object.keys(info.majors).sort()">{{ major }} : {{ info.majors[major]}} student<span v-if="info.majors[major]!=1">s</span></li>
                </ul>
            </span>
        </div>

        <div v-if="info.periods">
            <span>Periods:
                <ul>
                    <li v-for="period in Object.keys(info.periods).sort()">{{ period }} : {{ info.periods[period]}} student<span v-if="info.periods[period]!=1">s</span></li>
                </ul>
            </span>
        </div>

    </div>
</div>
`;

var info = { demo: "" };

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        console.log("updating view")
        updateView();
    }
});

function updateView() {

    firebase.database().ref("students").once('value', function (snapshot) {
        info.students = Object.keys(snapshot.val()).length;
        renderView();
    });

    firebase.database().ref("contracts").once('value', function (snapshot) {
        info.contracts = Object.keys(snapshot.val()).length;
        renderView();
    });

    firebase.database().ref("supervisors").once('value', function (snapshot) {
        info.supervisors = Object.keys(snapshot.val()).length;
        renderView();
    });

    firebase.database().ref("coordinators").once('value', function (snapshot) {
        info.coordinators = Object.keys(snapshot.val()).length;
        renderView();
    });

    firebase.database().ref("advisors").once('value', function (snapshot) {
        info.advisors = Object.keys(snapshot.val()).length;
        renderView();
    });

    firebase.database().ref("evaluation").once('value', function (snapshot) {
        coordinators = snapshot.val();
        var submissions = 0;
        var forms = 0;
        for (var coord in coordinators) {
            for (var form in coordinators[coord]) {
                forms++;
                for (var student in coordinators[coord][form]) {
                    submissions++;
                }
            }
        }
        info.forms = forms;
        info.submissions = submissions;
        renderView();
    });

    firebase.database().ref("coordinatorStudent").once('value', function (snapshot) {
        coordinators = snapshot.val();

        var periods = {};
        var majors = {};

        for (var coord in coordinators) {
            for (var period in coordinators[coord]) {
                for (var major in coordinators[coord][period]) {
                    for (var student in coordinators[coord][period][major]) {
                        if (periods[period]) {
                            periods[period]++;
                        } else {
                            periods[period] = 1;
                        }

                        if (majors[major]) {
                            majors[major]++;
                        } else {
                            majors[major] = 1;
                        }

                    }
                }
            }
        }

        info.periods = periods;
        info.majors = majors;

        renderView();
    });

}

function renderView() {
    info.demo = info.demo + "1";
}

app_report = {
    template: template,
    data() {
        return {
            info: info,
        };
    }
};

Vue.component("app-report", app_report);