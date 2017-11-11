app_evaluate_template = `
<div>
    <div>
        <div class="form-group col-sm-12">
            <div class="input-group">
                <span class="input-group-addon">Student</span>
                <select class="form-control" id="students">
                    <template v-for="student in students">
                        <option :value="student.id">{{student.name}}</option>
                    </template>
                </select>
            </div>
            <br/>
            <button class="btn btn-success" @click="viewForms();view = false">View forms</button>
            
            <hr/>

            <div class="input-group">
                <span class="input-group-addon">Form</span>
                <select class="form-control" id="forms">
                    <template v-for="form in forms">
                        <option :value="form.id">{{ form.name }}</option>
                    </template>
                </select>
            </div>
            <br/>
            <button class="btn btn-success" @click="viewForm();view=true">View form</button>
        </div>
        
        <div class="form-group col-sm-12" v-if="view">
            <hr/>
            <div class="panel panel-primary">
            
                <div class="panel-heading ">Questions</div>
                    <div class="panel-body">
                        <div class="input-group">
                            <span class="input-group-addon" style="min-width: 150px;">
                                Brief Training Description:
                            </span>
                            <textarea rows=2 class="form-control" id="brief"></textarea>
                        </div>
                        <br/>
                        <p class="h5">Each question is in scale of 0-10</p>
                        <hr/>
                        <div id="questions">
                            <div class="form-group" v-for="q in questions">
                                <label class="col-sm-5 control-label">{{ q }}</label>
                                <div class="col-sm-1">
                                    <input class="form-control" type="number" min=0 max=10>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-12">
                            <hr/>
                        </div>
                        <div class="input-group col-sm-12">
                            <span class="input-group-addon" style="min-width: 150px;"> Overall rating for the student’s performance: </span>
                            <div class="form-group" data-toggle="tooltip">
                                <select class="form-control" id="rating">
                                    <option value="Excellent">Excellent</option>
                                    <option value="Very Good">Very Good</option>
                                    <option value="Good">Good</option>
                                    <option value="Marginal">Marginal</option>
                                    <option value="Poor">Poor</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-sm-12">
                            <hr/>
                        </div>
                        <div class="input-group">
                            <span class="input-group-addon" style="min-width: 150px;">
                            Comments (if any):
                            </span>
                        <textarea rows=2 class="form-control" id="comments"></textarea>
                    </div>
                    </div>
                        
                </div>
                <button class="btn btn-success" @click="submit">Submit evaluation</button>
            </div>
        </div>
    </div>
</div>
`;


name = "Summer training form #1";
forms = [];
questions = [
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
            forms: forms,
            view: view
        };
    }
};

Vue.component('app-evaluate', app_evaluate);

function submit() {
    student = $("#students :checked").val();
    form = $("#forms :checked").val();
    brief = $("#brief").val();
    comments = $("#comments").val();
    rating = $("#rating").val();
    questions = $("#questions input").length;

    jsonQuestions = {};

    for (var i = 0; i < questions; i++)
        jsonQuestions["Q" + (i + 1)] = $("#questions input")[i].value;

    json = {
        brief: brief,
        comments: comments,
        rating: rating,
        questions: jsonQuestions
    };

    write2DB("evaluation" + "/" + coordinator.split(".").join(" ") + "/" + form + "/" + student, json);

    // Go to submitted page
    setTimeout(function () {
        window.location.href = "./submitted.html";
    }, 1500);
}

function viewForms() {
    console.log("view");

    while (forms.length != 0)
        forms.pop();

    var student = $("#students").val();
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
                console.log(vals[i]);
                forms.push({ id: i, name: vals[i].title });
            }
        }
    });
}

function viewForm() {
    console.log("new view");
}