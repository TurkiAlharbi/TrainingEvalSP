app_evaluate_template = `
<div>
    <v-layout row wrap>
        <v-flex xs12 class="text-xs-center">
            <v-select label="Student" v-bind:items="students" item-text="name" item-value="id" v-model="student" id="student" required></v-select>
            <v-btn class="green white--text" @click="viewForms(student);view = false">Choose student</v-btn>
            <v-select label="Form" v-bind:items="forms" item-text="name" v-model="form" id="form" required></v-select>
            <v-btn class="green white--text" @click="if(viewForm(form)){view=true;viewQuestions(form.questions,form.id,student)}">View form</v-btn>
        </v-flex>
        
        <v-flex xs12 v-if="view">
            <app-dashboard title="Evaluation">
                <v-form v-model="valid">
                    <v-layout wrap row>
                        <v-flex sm12 class="text-xs-center">
                            <v-text-field name="brief" label="Brief Training Description" v-model="brief" textarea rows=3></v-text-field>

                            <p class="h5">Each question is in scale of 0-10</p>
                        </v-flex>
                        
                        <v-flex sm12>
                            <table class="datatable table" xs12 style="margin:auto">
                                <thead>
                                    <tr>
                                        <th>Question</th>
                                        <th>Score</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr xs12 v-for="question in questions">
                                        <td>{{ question.title }}</td>
                                        <td><v-text-field type="number" min=0 max=10 v-model="question.value" required :rules="rules"></v-text-field></td>
                                    </tr>
                                </tbody>
                            </table>
                        </v-flex>
                        
                        <v-flex sm12>
                            <br/>
                        </v-flex>
                        
                        <v-flex sm12>
                            <v-select label="Overall rating" v-bind:items="ratings" v-model="rating" id="ratings" required :rules="ratingRules"></v-select>
                            <v-text-field name="comments" v-model="comments" label="Comments (if any)" textarea rows=3></v-text-field>
                        </v-flex>
                        
                        <v-flex sm12 class="text-xs-center">
                            <v-btn class="green white--text" @click="submit(student, form, brief, comments, rating)" :disabled="!valid">Submit evaluation</v-btn>
                        </v-flex>
                    </v-layout>
                </v-form>
            </app-dashboard>
        </v-flex>
    </v-layout>
</div>
`;


var name = "Summer training form #1";
var forms = [];
var questions = [];

var view = false;
var students = [];

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        console.log("updating view")
        updateView();
    }
});

function updateView() {

    // Gets email (identifier)
    supervisor = firebase.auth().currentUser.email.split(".").join(" ");

    // Connects to the supervisor data
    firebase.database().ref("supervisors/" + supervisor + "/students").once('value', function (snapshot) {

        // Clears the old list
        while (students.length > 0)
            students.pop();

        // Gets the snapshot of the data (assigned students of the supervisor)
        vals = snapshot.val();

        // For each student 
        for (var stu in vals) {
            fetchStudent(stu);
        }

    });
}

function fetchStudent(stu) {

    // Connect to get the student's data
    firebase.database().ref("students/" + stu).once('value', function (snapshot2) {

        // Gets the snapshot of the data (current student's data)
        studentVals = snapshot2.val();

        // Stores the students data
        var student = {
            id: stu,
        };

        // Get students data
        for (var key in studentVals)
            student[key] = studentVals[key];

        // Add to the list of students
        students.push(student);
    });
}

app_evaluate = {
    template: app_evaluate_template,
    data() {
        return {
            questions: questions,
            students: students,
            student: '',
            forms: forms,
            form: '',
            view: view,
            ratings: ["Excellent", "Very Good", "Good", "Marginal", "Poor"],
            rating: '',
            brief: '',
            comments: '',
            rules: [
                (v) => !!v || 'Score is required',
                (v) => v >= 0 || 'Score must be positive',
                (v) => v <= 10 || 'Score must be 10 or less',
            ],
            ratingRules: [
                (v) => !!v || 'Rating is required',
            ],
            valid: false
        };
    },
    methods: {

        viewQuestions: function (newQuestions, formId, student) {
            console.log("view questions");

            while (questions.length != 0)
                questions.pop();

            for (var q in newQuestions) {
                questions.push(newQuestions[q]);
            }
            evaluated = false;
            brief2 = "";
            comments2 = "";
            rating2 = "";
            questions2 = "";
            firebase.database().ref("evaluation" + "/" + coordinator.split(".").join(" ") + "/" + formId + "/" + student).once('value', function (snapshot) {
                vals = snapshot.val();
                evaluated = true;
                brief2 = vals.brief;
                comments2 = vals.comments;
                rating2 = vals.rating;
                questions2 = vals.questions;
            });

            setTimeout(() => {
                if (evaluated) {
                    this.brief = brief2;
                    this.comments = comments2;
                    this.rating = rating2;

                    for (var q in questions) {
                        index = "Q" + (parseInt(q) + 1)
                        console.log(index);
                        this.questions[q].value = questions2[index];
                    }
                }
            }, 500);
        }
    }
};

Vue.component('app-evaluate', app_evaluate);

function submit(student, form, brief, comments, rating) {

    jsonQuestions = {};
    for (var q = 0; q < questions.length; q++) {
        jsonQuestions["Q" + (q + 1)] = questions[q].value;
    }

    json = {
        brief: brief,
        comments: comments,
        rating: rating,
        questions: jsonQuestions
    };

    write2DB("evaluation" + "/" + coordinator.split(".").join(" ") + "/" + form.id + "/" + student, json);

    // Go to submitted page
    setTimeout(function () {
        window.location.href = "./submitted.html";
    }, 1500);
}

function viewForms(student) {
    console.log("view");

    while (forms.length != 0)
        forms.pop();

    // var student = $("#students").val();
    for (var i in students) {
        if (students[i].id == student) {
            student = students[i];
        }
    }
    coordinator = student.coordinator;

    firebase.database().ref("evaluation forms/" + coordinator.split(".").join(" ")).once('value', function (snapshot) {
        vals = snapshot.val();
        for (var i in vals) {
            if (student.period == vals[i].terms) {
                if (vals[i].status == "Opened")
                    forms.push({ id: i, name: vals[i].title, questions: vals[i].questions });
            }
        }
    });
}

function viewForm(form) {
    if (form == "")
        return false;

    console.log("new view");
    return true;
}