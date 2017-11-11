app_evaluations_table_template = `
<div>
    <div>
        <div class="form-group col-sm-12">
            <div class="input-group">
                <span class="input-group-addon">Form</span>
                <select class="form-control" id="forms">
                    <template v-for="form in forms">
                        <option :value="form.id">{{ form.key }}</option>
                    </template>
                </select>
            </div>
            <br/>
            
            <button class="btn btn-success" @click="viewForm();view = true">View form</button>

            <p v-show="false">{{form}}</p>
            
            <div class="table-responsive" v-if="view">
                <hr/>
                <table class="table table-striped table-hover table-condensed table-bordered table-responsive">
                    <thead>
                        <tr>
                            <th style="text-align:center;font-size:.95em" rowspan="2">Student</th>
                            <th style="text-align:center;font-size:.95em" rowspan="2">Brief description</th>
                            <th style="text-align:center;font-size:.95em" rowspan="2">Comments</th>
                            <th style="text-align:center;font-size:.95em" rowspan="2">Rating</th>
                            <th style="text-align:center;font-size:.95em" :colspan="100">Questions</th>
                        </tr>
                        <tr>
                            <td style="text-align:center;font-size:.8em" v-for="question in questions">
                                {{ question }}
                            </td>
                        </tr>
                    </thead>
                    <tbody>
                        <template v-for="(student,index) in form.students">
                            <tr>
                                <td style="text-align:center;font-size:.8em">{{ form.students[index].name }}</td>
                                <td style="text-align:center;font-size:.8em">{{ form.students[index].brief }}</td>
                                <td style="text-align:center;font-size:.8em">{{ form.students[index].comments }}</td>
                                <td style="text-align:center;font-size:.8em">{{ form.students[index].rating }}</td>
                                <td style="text-align:center" v-for="question in form.students[index].questions">
                                    {{ question }}
                                </td>
                            </tr>
                        </template>
                    </tbody>
                </table>
            </div>
            <br/>
        </div>
    </div>
</div>
`;

var forms = [];
var view = false;
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

var students = [];
var form = { demo: "demo" };

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        console.log("updating view")
        updateView();
    }
});

function updateView() {

    // Gets email (identifier)
    supervisor = firebase.auth().currentUser.email.split(".").join(" ");

    // Connects to the evaluations
    firebase.database().ref("evaluation/" + supervisor).once('value', function (snapshot) {

        vals = snapshot.val();

        while (forms.length != 0)
            forms.pop();

        var x = 0;

        for (var i in vals) {
            addForm(vals[i], i, x);
            x++;
        }
    });
}

function addForm(vals, i, x) {

    for (var s in vals) {
        firebase.database().ref("students/" + s + "/name").once('value', function (snapshot2) {
            name = snapshot2.val();
            vals[s].name = name;
        });
    }

    newForm = { students: vals, key: i, id: x };
    forms.push(newForm);
}

function viewForm() {
    console.log("new view");

    formID = $("#forms").val();
    form.students = forms[formID].students;
    form.id = forms[formID].id;
    form.key = forms[formID].key;
    form.demo = form.demo + "1";
}


app_evaluations_table = {
    template: app_evaluations_table_template,
    data() {
        return {
            forms: forms,
            form: form,
            view: view
        }
    }
};

Vue.component('app-evaluations-table', app_evaluations_table);