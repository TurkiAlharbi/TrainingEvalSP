app_setup_modify_template = `
<div>
    <v-layout wrap>
        <v-flex xs12>
            <v-select label="Form" v-bind:items="forms" item-text="title" v-model="form" required></v-select>
        </v-flex>
        <v-btn class="green white--text" @click="if(show(form))shown=true">Show</v-btn>
        
        
        <app-dashboard title="Questions" v-if="shown">
            <table v-if="questions.length!=0">
                <thead class="text-xs-center">
                    <tr>
                        <td>Question</td>
                        <td>Weight</td>
                        <td>Remove</td>
                    </tr>
                </thead>
                <tbody>
                    <template v-for="(question,index) in questions">
                        <tr>
                            <td style="width:95%" class="pl-5 pr-5">
                                <v-text-field v-model="question.title"></v-text-field>
                            </td>
                            <td class="pl-5 pr-5 ma-5" >
                                <v-text-field v-model="question.weight" type="number" min=0 max=100></v-text-field>
                            </td>
                            <td>
                                <v-btn color="red" flat icon @click="removeQ2(index)"><v-icon>cancel</v-icon></v-btn>
                            </td>
                        </tr>
                    </template>
                </tbody>
            </table>
            <v-flex xs12 class="text-xs-center">
                <v-btn class="cyan white--text" @click="addNewQ2">Add extra question</v-btn>
            </v-flex>
            <v-flex xs12 class="text-xs-center">
                <v-btn class="green white--text" @click="saveOpen2(form.title,form.terms,form.autoClose,form.id)">Save and open</v-btn>
                <v-btn class="green white--text" @click="saveDraft2(form.title,form.terms,form.autoClose,form.id)">Save and keep as a draft</v-btn>
            </v-flex>
        </app-dashboard>
        
    </v-layout>
</div>
`;

var questions = [];
var forms = [];

app_setup_modify = {
    template: app_setup_modify_template,
    data() {
        return {
            questions: questions,
            forms: forms,
            form: '',
            name: '',
            autoClose: '',
            shown: false
        };
    }
};

Vue.component('app-setup-modify', app_setup_modify);

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        console.log("updating view")
        updateViewModify();
    }
});

function updateViewModify() {
    getForms();
}

function getForms() {
    // Gets email (identifier)
    coordinator = firebase.auth().currentUser.email.split(".").join(" ");

    // Connects to the coordinator data
    firebase.database().ref("evaluation forms/" + coordinator).on('value', function (snapshot) {

        // Clears the old list
        while (forms.length > 0)
            forms.pop();

        // Gets the snapshot of the data (forms of the coordinator)
        vals = snapshot.val();

        for (var i in vals) {
            var newForm = vals[i];
            newForm.id = i;
            if (newForm.status == "Drafted")
                forms.push(newForm);
        }
    });
}

function saveOpen2(name, period, autoClose, form) {
    save2(name, period, autoClose, form, "Opened", "Saved as a open");
}

function saveDraft2(name, period, autoClose, form) {
    save2(name, period, autoClose, form, "Drafted", "Saved as a draft");
}

function save2(name, period, autoClose, form, status, message) {

    evalID = form;
    var coordinator = firebase.auth().currentUser.email.split(".").join(" ");

    var jsonquestions = {};
    for (var q = 0; q < questions.length; q++)
        if (questions[q].title != "")
            jsonquestions["Q" + (q + 1)] = questions[q];

    var json = { autoClose: autoClose, status: status, terms: period, title: name, questions: jsonquestions };

    update2DB("evaluation forms/" + coordinator + "/" + evalID, json);

    alert(message);
}

function addNewQ2() {
    questions.push({ title: "", weight: 1 });
}

function removeQ2(index) {
    questions.splice(index, 1);
}

function show(form) {
    if (form == "")
        return;

    while (questions.length > 0)
        questions.pop();

    for (var q in form.questions) {
        questions.push(form.questions[q]);
    }

    return true;
}