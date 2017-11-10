app_evaluate_template = `
<div>
    <div>
        <form>
            <div class="form-group col-sm-12">
                <div class="input-group">
                    <span class="input-group-addon">Student</span>
                    <select class="form-control" id="students">
                        <option v-for="student in students" :value="student">{{student}}</option>
                    </select>
                </div>
                <br/>
                <div class="input-group">
                    <span class="input-group-addon">Form</span>
                    <select class="form-control" id="forms">
                        <option value="1">Default Training Form</option>
                    </select>
                </div>
                <hr/>
            </div>

            <div class="form-group col-sm-12">
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
                </div>
            </div>
        </form>
        <button class="btn btn-success" @click="submit">Submit evaluation</button>
    </div>
</div>
`;

name = "Summer training form #1";
students = ["s201224780"];
forms = ["Form 1", "Form 2", "Form 3"];
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


app_evaluate = {
    template: app_evaluate_template,
    data() {
        return {
            questions: questions
        };
    }
};

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        console.log("updating view")
        updateView();
    }
});

function updateView() {
    //TBD
}

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

    firebase.database().ref("students/" + student + "/period").once('value', function (snapshot) {
        period = snapshot.val();

    }).then(function () {
        firebase.database().ref("students/" + student + "/coordinator").once('value', function (snapshot2) {
            coordinator = snapshot2.val().split(".").join(" ");

        }).then(function () {
            write2DB("evaluation/" + coordinator + "/" + period + "/" + form + "/" + student, json);
        });
    });
}