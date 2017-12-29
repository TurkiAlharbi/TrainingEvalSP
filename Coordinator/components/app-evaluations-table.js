app_evaluations_table_template = `
<div>
    <div>
        <v-flex xs12>
            <v-select label="Form" v-bind:items="forms" item-text="title" item-value="id" v-model="form" required></v-select>
        </v-flex>
        <v-flex xs12>
            <v-btn class="green white--text" @click="viewForm(form);view = true">View form 
                <v-icon dark right>format_list_numbered</v-icon>
            </v-btn>
        </v-flex>
        <v-flex xs12>
            <p v-show="false">{{form}}</p>
            
            <div v-if="view">

                <app-expandable title="Questions">
                    <table class="datatable inner table">
                        <tbody>
                            <tr v-for="(question,i,b) in questions">
                                <td class="text-xs-center ma-0 pa-0">{{ 'Q'+(i+1) }}</td>
                                <td class="text-xs-center ma-0 pa-0">{{ question.title }}</td>
                            </tr>
                        </tbody>
                    </table>
                </app-expandable>

                <p>Number of submitted evaluations: {{ formStudents.length }}</p>

                <v-text-field append-icon="search" label="Search" v-model="search"></v-text-field>
                
                <v-data-table v-bind:headers="headers.concat(questions)" :items="formStudents" v-bind:search="search" item-key="name" hide-actions class="elevation-1">
                    <template slot="items" slot-scope="props">
                        <tr @click="props.expanded = !props.expanded">
                            <td class="text-xs-center ma-0 pa-0">{{ props.item.name }}</td>
                            <td class="text-xs-center ma-0 pa-0">{{ props.item.rating }}</td>
                            <td class="text-xs-center ma-0 pa-0" v-for="(question,i,b) in props.item.questions">
                                {{ props.item.questions['Q'+(b+1)] }}
                            </td>
                        </tr>
                    </template>
                    <template slot="expand" slot-scope="props">
                        <v-card flat>
                            <v-card-text>
                                <table class="datatable inner table">
                                    <tr v-if="props.item.brief">
                                        <td>Brief</td>
                                        <td>{{ props.item.brief }}</td
                                    </tr>
                                    <tr v-for="(question,i,b) in props.item.questions">
                                        <td>{{ questions[b].title }}</td>
                                        <td>{{ props.item.questions['Q'+(b+1)] }}</td
                                    </tr>
                                    <tr>
                                        <td>Overall rating</td>
                                        <td>{{ props.item.rating }}</td
                                    </tr>
                                    <tr v-if="props.item.comments">
                                        <td>Comments</td>
                                        <td>{{ props.item.comments }}</td
                                    </tr>
                                </table>
                            </v-card-text>
                        </v-card>
                    </template>
                </v-data-table>
            </div>
        </v-flex>
    </div>

    <br/>
    
    <v-layout justify-center v-if="formStudents.length != 0">
        <v-btn class="green white--text" @click="exportCurrentView">Save current view as xls</v-btn>
    </v-layout>
</div>
`;

var forms = [];
var view = false;
var questions = [];

var headers = [
    { text: 'Name', pop: 'Name', value: 'name', align: "center" },
    { text: 'Rating', pop: 'Rating', value: 'rating', align: "center" },
];

var students = [];
var form = { demo: "demo", students: [] };
var formStudents = [];

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        console.log("updating view")
        updateView();
    }
});

function updateView() {

    // Gets email (identifier)
    coordinator = firebase.auth().currentUser.email.split(".").join(" ");

    // Connects to the evaluations
    firebase.database().ref("evaluation forms/" + coordinator).once('value', function (snapshot3) {
        coordinatorForms = snapshot3.val();
        var index = 0;
        for (var form_meta in coordinatorForms) {
            var form = coordinatorForms[form_meta];
            var jsonQuestions = [];
            var numOfQuestions = Object.keys(form.questions).length;

            for (var q = 0; q < numOfQuestions; q++) {
                var newQuestion = { title: form.questions["Q" + (q + 1)].title, text: "Q" + (q + 1), label: "Q" + (q + 1), sortable: false, align: "center" };
                jsonQuestions.push(newQuestion);
            }

            var newForm = { key: form_meta, title: form.title, jsonQuestions: jsonQuestions, id: index };
            index++;
            getEvaluations(form_meta, newForm);

        }
    });
}

function getEvaluations(name, newForm) {
    firebase.database().ref("evaluation/" + coordinator + "/" + name).once('value', function (snapshot3) {
        var form = snapshot3.val();

        var students = {};
        for (var student in form)
            students[student] = form[student];

        newForm.students = students;
        forms.push(newForm);
    });
}

function resolveStudentName(json, student) {
    firebase.database().ref("students/" + student + "/name").once('value', function (snapshot3) {
        try {
            json.name = snapshot3.val();
        } catch (err) {
            json.name = student;
            console.log(err.name);
        }
        formStudents.push(json);
    });
}

function viewForm(formID) {
    console.log("new view");

    // Clears old list
    while (formStudents.length != 0)
        formStudents.pop();

    for (var stu in forms[formID].students)
        resolveStudentName(forms[formID].students[stu], stu);

    var form = forms[formID];

    // Clears old list
    while (questions.length != 0)
        questions.pop();

    for (var q = 0; q < forms[formID].jsonQuestions.length; q++)
        questions.push(forms[formID].jsonQuestions[q]);

    rerender();
}

function rerender() {
    form.demo = form.demo + "1";
}

function setQuestionsHeader() {
    for (i in questions)
        questions[i].text = questions[i].title;
}

function resetQuestionsHeader() {
    for (i in questions)
        questions[i].text = questions[i].label;
}

function exportCurrentView() {
    $("thead .material-icons.icon").remove();
    $(".datatable__progress").remove();

    setQuestionsHeader();

    setTimeout(() => {
        e1 = exportTable2("Evaluations");
        e1.reset();
        document.getElementsByClassName("button-default xls")[0].click();
        resetQuestionsHeader();
    }, 500);
}

app_evaluations_table = {
    template: app_evaluations_table_template,
    data() {
        return {
            students: students,
            questions: questions,
            forms: forms,
            form: form,
            formStudents: formStudents,
            view: view,
            search: ''
        };
    }
};

Vue.component('app-evaluations-table', app_evaluations_table);