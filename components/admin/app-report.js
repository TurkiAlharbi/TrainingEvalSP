template = `
    <v-container>
        <p v-show="false">{{ info.demo }}</p>
        <p v-if="info.students">Number of students: {{ info.students }}</p>
        <p v-if="info.contracts">Number of submitted contracts: {{ info.contracts }}</p>

        <p v-if="info.supervisors">Number of supervisors: {{ info.supervisors }}</p>

        <p v-if="info.coordinators">Number of coordinators: {{ info.coordinators }}</p>
        <p v-if="info.advisors">Number of advisors, including advising coordinators: {{ info.advisors }}</p>

        <p v-if="info.forms">Number of evaluation forms: {{ info.forms }}</p>
        <p v-if="info.submissions">Number of evaluation submissions: {{ info.submissions }}</p>

        <app-dashboard title="Majors" v-if="info.majors">
            <v-data-table v-bind:headers="periodHeaders" :items="majorsTable" hide-actions class="elevation-1">
                <template slot="items" slot-scope="props">
                    <td class="text-xs-center">{{ props.item.name }}</td>
                    <td class="text-xs-center">{{ props.item.number }}</td>
                </template>
            </v-data-table>
        </app-dashboard>

        <br/>
        <app-dashboard title="Periods" v-if="info.periods">
            <v-data-table v-bind:headers="periodHeaders" :items="periodsTable" hide-actions class="elevation-1">
                <template slot="items" slot-scope="props">
                    <td class="text-xs-center">{{ props.item.name }}</td>
                    <td class="text-xs-center">{{ props.item.number }}</td>
                </template>
            </v-data-table>
        </app-dashboard>

    </v-container>
`;

var majorsTable = [];
var majorHeaders = [
    { text: 'Name', value: 'name', align: "center" },
    { text: 'Number of students', value: 'number', align: "center" },
];

var periodsTable = [];
var periodHeaders = [
    { text: 'Name', value: 'name', align: "center" },
    { text: 'Number of students', value: 'number', align: "center" },
];

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
        for (var thisMajor in majors)
            majorsTable.push({ name: thisMajor, number: majors[thisMajor] });

        for (var thisPeriod in periods)
            periodsTable.push({ name: thisPeriod, number: periods[thisPeriod] });
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
            majorHeaders: majorHeaders,
            majorsTable: majorsTable,
            periodHeaders: periodHeaders,
            periodsTable: periodsTable,

        };
    }
};

Vue.component("app-report", app_report);