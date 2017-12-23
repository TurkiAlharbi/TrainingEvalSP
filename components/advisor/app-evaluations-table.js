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
    advisor = firebase.auth().currentUser.email.split(".").join(" ");

    firebase.database().ref("advisorStudent/" + advisor).once('value', function (snapshot3) {
        terms = snapshot3.val();
        if (terms) {
            term = Object.keys(terms)[0];
            if (terms[term]) {
                major = Object.keys(terms[term])[0];
                if (terms[term][major]) {
                    stu = Object.keys(terms[term][major])[0];
                    firebase.database().ref("students/" + stu + "/coordinator").once('value', function (snapshot4) {
                        coordinator = snapshot4.val();
                    }).then(function () {
                        getCoordEvals();
                    });
                }
            }
        }
    });
}

function getCoordEvals() {
    // Connects to the evaluations
    firebase.database().ref("evaluation forms/" + coordinator).once('value', function (snapshot3) {
        coordinatorForms = snapshot3.val();
        var index = 0;
        for (var form_meta in coordinatorForms) {
            var form = coordinatorForms[form_meta];
            var jsonQuestions = [];
            var numOfQuestions = Object.keys(form.questions).length;

            for (var q = 0; q < numOfQuestions; q++) {
                var newQuestion = { title: form.questions["Q" + (q + 1)].title, text: "Q" + (q + 1), label: "Q" + (q + 1), sortable: false };
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
    firebase.database().ref("students/" + student).once('value', function (snapshot3) {
        try {
            vals = snapshot3.val()
            json.name = vals.name;
            if (vals.advisor == advisor)
                formStudents.push(json);
        } catch (err) {
            json.name = student;
            console.log(err.name);
        }
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