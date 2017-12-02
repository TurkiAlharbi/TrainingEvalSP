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
                    <ul>
                        <li v-for="(question,i,b) in questions" class="black--text">{{ 'Q'+(i+1)+': '+question.title }}</li>
                    </ul>
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
                                <tr>
                                    <th></th>
                                    <th>Score/Brief/Comment</th>
                                </tr>
                                <tr>
                                    <td>Brief</td>
                                    <td>{{ props.item.brief }}</td
                                </tr>
                                <tr v-for="(question,i,b) in props.item.questions">
                                    <td>{{ questions[b].title }}</td>
                                    <td>{{ props.item.questions['Q'+(b+1)] }}</td
                                </tr>
                                <tr>
                                    <td>Rating</td>
                                    <td>{{ props.item.rating }}</td
                                </tr>
                                <tr>
                                    <td>Comments</td>
                                    <td>{{ props.item.comments }}</td
                                </tr>
                            </v-card-text>
                        </v-card>
                    </template>
                </v-data-table>
            </div>
        </v-flex>
    </div>
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
            console.log(form);
            var jsonQuestions = [];
            var numOfQuestions = Object.keys(form.questions).length;

            for (var q = 0; q < numOfQuestions; q++) {
                var newQuestion = { title: form.questions["Q" + (q + 1)].title, text: "Q" + (q + 1), sortable: false };
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
    })
}

function viewForm(formID) {
    console.log("new view");

    // Clears old list
    while (formStudents.length != 0)
        formStudents.pop();

    for (var stu in forms[formID].students) {
        var brief = forms[formID].students[stu].brief;
        var comments = forms[formID].students[stu].comments;
        var rating = forms[formID].students[stu].rating;
        var stuQuestions = forms[formID].students[stu].questions;
        var json = { name: stu, brief: brief, comments: comments, rating: rating, questions: stuQuestions };
        formStudents.push(json);
    }

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