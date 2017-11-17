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
                
                <v-text-field append-icon="search" label="Search" v-model="search"></v-text-field>
                {{ form.students }}
                <v-data-table v-bind:headers="headers.concat(questions)" :items="formStudents" v-bind:search="search" hide-actions class="elevation-1">
                    <template slot="headerCell" slot-scope="props">
                        <v-tooltip bottom>
                            <span slot="activator">{{ props.header.pop }}</span>
                            <span>{{ props.header.text }}</span>
                        </v-tooltip>
                    </template>
                    <template slot="items" slot-scope="props">
                        <td class="text-xs-center">{{ props.item.name }}</td>
                        <td class="text-xs-center">{{ props.item.brief }}</td>
                        <td class="text-xs-center">{{ props.item.comments }}</td>
                        <td class="text-xs-center">{{ props.item.rating }}</td>
                        <td class="text-xs-center" v-for="(question,i,b) in props.item.questions">
                            {{props.item.questions['Q'+(b+1)]}}
                        </td>
                    </template>
                </v-data-table>
            </div>
        </v-flex>
    </div>
</div>
`;

var forms = [];
var view = false;
var questions = [

    { text: "Enthusiasm and interest in work", sortable: false, pop: "Q1" },
    { text: "Attitude towards delivering accurate work", sortable: false, pop: "Q2" },
    { text: "Quality of work output", sortable: false, pop: "Q3" },
    { text: "Initiative in taking tasks to complete", sortable: false, pop: "Q4" },
    { text: "Dependability and reliability", sortable: false, pop: "Q5" },
    { text: "Ability to learn and search for information", sortable: false, pop: "Q6" },
    { text: "Judgment and decision making", sortable: false, pop: "Q7" },
    { text: "Maintaining effective relations with co-workers", sortable: false, pop: "Q8" },
    { text: "Ability of reporting and presenting his work", sortable: false, pop: "Q9" },
    { text: "Attendance", sortable: false, pop: "Q10" },
    { text: "Punctuality", sortable: false, pop: "Q11" },
];

var headers = [
    { text: 'Name', pop: 'Name', value: 'name', align: "center" },
    { text: 'Brief', pop: 'Brief', value: 'brief', align: "center" },
    { text: 'Comments', pop: 'Comments', value: 'comments', align: "center" },
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
    firebase.database().ref("evaluation/" + coordinator).once('value', function (snapshot) {

        vals = snapshot.val();

        while (forms.length != 0)
            forms.pop();

        var x = 0;

        for (var key in vals) {
            addForm(vals[key], key, x);
            x++;
        }
    });
}

function addForm(vals, key, x) {

    for (var s in vals) {
        firebase.database().ref("students/" + s + "/name").once('value', function (snapshot2) {
            name = snapshot2.val();
            vals[s].name = name;
        });
    }

    firebase.database().ref("evaluation forms/" + coordinator + "/" + key).once('value', function (snapshot3) {
        form_meta = snapshot3.val();
        var newForm = { students: vals, key: key, id: x, title: form_meta.title };
        console.log(newForm);
        forms.push(newForm);
    });


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
        var questions = forms[formID].students[stu].questions;
        console.log({ name: stu, brief: brief, comments: comments, rating: rating, questions: questions })
        formStudents.push({ name: stu, brief: brief, comments: comments, rating: rating, questions: questions });
    }

    form.id = forms[formID].id;
    form.key = forms[formID].key;
    form = forms[formID];
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