app_setup_new_template = `
<div>
        <v-layout wrap>
            <v-flex xs5>
                <v-text-field label="Name" id="name" v-model="name" required></v-text-field>
            </v-flex>
            <v-flex xs2>
            </v-flex>
            <v-flex xs5>
                <v-select label="Period" v-bind:items="periods" v-model="period" required></v-select>
            </v-flex>
            <v-flex xs5>
                <v-text-field label="Opened for" id="autoClose" v-model="autoClose" required suffix="day(s) "></v-text-field>
            </v-flex>
            <v-flex xs2>
            </v-flex>
            <v-flex xs5>
                <v-text-field label="Form number" id="formNumber" v-model="formNumber" required></v-text-field>
            </v-flex>

            <app-dashboard title="Questions">
                <table>
                    <tbody>
                        <template v-for="question in newQuestions">
                            <tr>
                                <td style="width:95%;height:10px">
                                    <v-text-field :value="question" :id="name"></v-text-field>
                                </td>
                                <td>
                                    <v-btn color="red" flat icon><v-icon>cancel</v-icon></v-btn>
                                </td>
                            </tr>
                        </template>
                    </tbody>
                </table>
                <v-flex xs12 class="text-xs-center">
                    <v-btn class="cyan white--text">Add extra question</v-btn>
                </v-flex>
            </app-dashboard>
            
            <v-flex xs12 class="text-xs-center">
                <v-btn class="green white--text" @click="saveOpen(name,period,autoClose,formNumber)">Save and open</v-btn>
                <v-btn class="green white--text" @click="saveDraft(name,period,autoClose,formNumber)">Save as draft</v-btn>
            </v-flex>
        </v-layout>
</div>
`;

var newQuestions = [
    "Enthusiasm and interest in work",
    "Attitude towards delivering accurate work",
    "Quality of work output",
    "Initiative in taking tasks to complete",
    "Dependability and reliability",
    "Ability to learn and search for information",
    "Judgment and decision making",
    "Maintaining effective relations with co-workers",
    "Ability of reporting and presenting his work",
    "Attendance",
    "Punctuality",
];

var periods = [];

app_setup_new = {
    template: app_setup_new_template,
    data() {
        return {
            newQuestions: newQuestions,
            periods: periods,
            period: '',
            name: '',
            autoClose: '',
            formNumber: ''
        };
    }
};

Vue.component('app-setup-new', app_setup_new);

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        console.log("updating view")
        updateView();
    }
});

function updateView() {
    getPeriods();
}

function getPeriods() {
    // Gets email (identifier)
    coordinator = firebase.auth().currentUser.email.split(".").join(" ");

    // Connects to the coordinator data
    firebase.database().ref("coordinators/" + coordinator + "/terms").on('value', function (snapshot) {

        // Clears the old list
        while (periods.length > 0)
            periods.pop();

        // Gets the snapshot of the data (periods of the coordinator)
        vals = snapshot.val();

        for (var i in vals)
            periods.push(i);

        console.log(periods);
    });
}

function saveOpen(name, period, autoClose, formNumber) {

    var status = "Opened";

    // TBD
    evalID = period.split(")").join("_").split("(").join("_").split("#").join("_").split(" ").join("_") + "_form" + formNumber;
    coordinator = firebase.auth().currentUser.email.split(".").join(" ");

    update2DB("evaluation forms/" + coordinator + "/" + evalID, { autoClose: autoClose, status: status, terms: period, title: name });
    alert("Saved as open");
}

function saveDraft(name, period, autoClose, formNumber) {

    var status = "Drafted";

    // TBD
    evalID = period.split(")").join("_").split("(").join("_").split("#").join("_").split(" ").join("_") + "_form" + formNumber;
    coordinator = firebase.auth().currentUser.email.split(".").join(" ");

    update2DB("evaluation forms/" + coordinator + "/" + evalID, { autoClose: autoClose, status: status, terms: period, title: name });
    alert("Saved as a draft");
}

