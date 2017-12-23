template = `
<v-container>
    <p v-show="false">{{ info.demo }}</p>
    <template v-if="info.students||info.contracts||info.coordinators||info.inactiveCoordinators||info.advisors||info.supervisors||info.forms||info.submissions">
        <v-container>
            <table class="datatable table" id="numbers">
                <thead>
                    <tr>
                        <th>Type</th>
                        <th>Number</th>
                    </tr>
                </thead>
                <tbody class="text-xs-center">
                    <tr v-if="info.coordinators"><td>Coordinators</td><td>{{ info.coordinators }}</td></tr>
                    <tr v-if="info.inactiveCoordinators"><td>Inactivated coordinators</td><td>{{ info.inactiveCoordinators }}</td></tr>
                    <tr v-if="info.advisors"><td>Advisors, including advising coordinators</td><td>{{ info.advisors }}</td></tr>

                    <tr v-if="info.supervisors"><td>Supervisors</td><td>{{ info.supervisors }}</td></tr>

                    <tr v-if="info.students"><td>Students</td><td>{{ info.students }}</td></tr>
                    <tr v-if="info.contracts"><td>Submitted contracts</td><td>{{ info.contracts }}</td></tr>

                    <tr v-if="info.forms"><td>Evaluation forms</td><td>{{ info.forms }}</td></tr>
                    <tr v-if="info.submissions"><td>Evaluation submissions</td><td>{{ info.submissions }}</td></tr>
                </tbody>
            </table>
        </v-container>

        <app-dashboard title="Majors" v-if="info.majors">
            <v-data-table v-bind:headers="periodHeaders" :items="majorsItems" hide-actions class="elevation-1" id="majors">
                <template slot="items" slot-scope="props">
                    <td class="text-xs-center">{{ props.item.name }}</td>
                    <td class="text-xs-center">{{ props.item.number }}</td>
                </template>
            </v-data-table>
        </app-dashboard>

        <br/>

        <app-dashboard title="Periods" v-if="info.periods">
            <v-data-table v-bind:headers="periodHeaders" :items="periodItems" hide-actions class="elevation-1" id="periods">
                <template slot="items" slot-scope="props">
                    <td class="text-xs-center">{{ props.item.name }}</td>
                    <td class="text-xs-center">{{ props.item.number }}</td>
                </template>
            </v-data-table>
        </app-dashboard>

        <br/>

        <v-layout justify-center>
            <v-btn class="green white--text" @click="exportCurrentView">Save current view as xls</v-btn>
        </v-layout>
    </template>
    <template v-else>
        <v-layout justify-center>
            Loading...
        </v-layout>
    </template>
</v-container>
`;

var majorsTable = [];
var majorHeaders = [
    { text: 'Name', value: 'name', align: "center" },
    { text: 'Students', value: 'number', align: "center" },
];

var periodsTable = [];
var periodHeaders = [
    { text: 'Name', value: 'name', align: "center" },
    { text: 'Students', value: 'number', align: "center" },
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

    firebase.database().ref("inactive/coordinators/").once('value', function (snapshot) {
        try {
            info.inactiveCoordinators = Object.keys(snapshot.val()).length;
        } catch (err) {
            console.log(err.name);
            info.inactiveCoordinators = "0";
        }
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

function exportCurrentView() {
    $(".material-icons.icon").remove()
    $(".datatable__progress").remove()

    e1 = exportTableById("Numbers report", "numbers");
    e1.reset();
    document.getElementsByClassName("button-default xls")[0].click();

    e2 = exportTableById("Periods report", "periods");
    e2.reset();
    document.getElementsByClassName("button-default xls")[0].click();

    e3 = exportTableById("Majors report", "majors");
    e3.reset();
    document.getElementsByClassName("button-default xls")[0].click();
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
    },
    computed: {
        periodItems: function () {
            return this.periodsTable.sort(function (a, b) {
                return a.name >= b.name;
            });
        },
        majorsItems: function () {
            return this.majorsTable.sort(function (a, b) {
                return a.name >= b.name;
            });
        }
    }
};

Vue.component("app-report", app_report);