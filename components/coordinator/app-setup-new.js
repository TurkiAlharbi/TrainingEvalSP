app_setup_new_template = `
<div>
    <v-form v-model="isValid">
        <v-layout wrap>
            <v-flex xs12 sm5>
                <v-text-field label="Name" id="name" v-model="name" :rules="nameRules" required></v-text-field>
            </v-flex>
            <v-flex xs12 sm5 offset-sm2>
                <v-select label="Period" v-bind:items="periods" v-model="period" :rules="periodRules" required></v-select>
            </v-flex>
            <v-flex xs12 sm5>
                <v-text-field label="Opened for" id="autoClose" v-model="autoClose" :rules="autoRules" required suffix="day(s) "></v-text-field>
            </v-flex>
            <v-flex xs12 sm5 offset-sm2>
                <v-text-field label="Form number" id="formNumber" v-model="formNumber" :rules="numRules" required></v-text-field>
            </v-flex>

            <app-dashboard title="Questions">
                <table v-if="newQuestions.length!=0">
                    <thead class="text-xs-center">
                        <tr>
                            <td>Question</td>
                            <td>Weight</td>
                            <td>Remove</td>
                        </tr>
                    </thead>
                    <tbody>
                        <template v-for="(question,index) in newQuestions">
                            <tr>
                                <td style="width:95%" class="pl-5 pr-5">
                                    <v-text-field v-model="question.title" :rules="qRules"></v-text-field>
                                </td>
                                <td class="pl-5 pr-5 ma-5" >
                                    <v-text-field v-model="question.weight" type="number" :rules="wRules"></v-text-field>
                                </td>
                                <td>
                                    <v-btn color="red" flat icon @click="removeQ(index)"><v-icon>cancel</v-icon></v-btn>
                                </td>
                            </tr>
                        </template>
                    </tbody>
                </table>
                <v-flex xs12 class="text-xs-center">
                    <v-btn class="cyan white--text" @click="addNewQ">Add extra question</v-btn>
                </v-flex>
            </app-dashboard>
            
            <v-flex xs12 class="text-xs-center">
                <v-btn class="green white--text" @click="saveOpen(name,period,autoClose,formNumber)" :disabled="!isValid">Save and open</v-btn>
                <v-btn class="green white--text" @click="saveDraft(name,period,autoClose,formNumber)" :disabled="!isValid">Save as draft</v-btn>
            </v-flex>
        </v-layout>
    </v-form>
</div>
`;

var newQuestions = [
    { title: "", weight: 1 },
    { title: "", weight: 1 },
    { title: "", weight: 1 },
];

var periods = [];

app_setup_new = {
    template: app_setup_new_template,
    data() {
        return {
            isValid: false,
            newQuestions: newQuestions,
            periods: periods,
            period: '',
            periodRules: [
                v => !!v || 'Period is required',
            ],
            name: '',
            nameRules: [
                v => !!v || 'Name is required',
            ],
            autoClose: '',
            autoRules: [
                v => !!v || 'Is required',
            ],
            formNumber: '',
            numRules: [
                v => !!v || 'Form number is required',
            ],
            wRules: [
                v => !!v || 'Weight for the question is required',
                v => v <= 100 || 'Weight must be 100 or less',
                v => v > 0 || 'Weight must be greater than 0',
            ],
            qRules: [
                v => !!v || 'The question title is required',
            ],
        };
    }
};
function val(v) {
    return parseInt(v);
}
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
    save(name, period, autoClose, formNumber, "Opened", "Saved as a open");
}

function saveDraft(name, period, autoClose, formNumber) {
    save(name, period, autoClose, formNumber, "Drafted", "Saved as a draft");
}

function save(name, period, autoClose, formNumber, status, message) {

    // TBD
    var evalID = period.split(")").join("_").split("(").join("_").split("#").join("_").split(" ").join("_") + "_form" + formNumber;
    var coordinator = firebase.auth().currentUser.email.split(".").join(" ");

    var jsonNewQuestions = {};
    for (var q = 0; q < newQuestions.length; q++)
        if (newQuestions[q].title != "")
            jsonNewQuestions["Q" + (q + 1)] = newQuestions[q];

    var json = { autoClose: autoClose, status: status, terms: period, title: name, questions: jsonNewQuestions };

    update2DB("evaluation forms/" + coordinator + "/" + evalID, json);

    alert(message);
}

function addNewQ() {
    newQuestions.push({ title: "", weight: 1 });
}

function removeQ(index) {
    newQuestions.splice(index, 1);
}