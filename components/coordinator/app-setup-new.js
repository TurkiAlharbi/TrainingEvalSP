app_setup_new_template = `
<div>
    
        <h3>New form</h3>
        <hr/>
        <div class="form-group col-sm-6">
            <div class="input-group">
                <span class="input-group-addon">Name</span>
                <input id="name" type="text" class="form-control">
            </div>
        </div>

        <div class="form-group col-sm-6">
            <div class="input-group">
                <span class="input-group-addon">Periods</span>
                <select class="form-control" id="periods">
                    <option v-for="period in periods">{{ period }}</option>
                </select>
            </div>
        </div>

        <div class="form-group col-sm-6">
            <div class="input-group">
                <span class="input-group-addon">Opened for</span>
                <input id="autoClose" type="text" class="form-control">
                <span class="input-group-addon">Day(s)</span>
            </div>
        </div>

        <div class="form-group col-sm-6">
            <div class="input-group">
                <span class="input-group-addon">Form number</span>
                <input id="formNumber" type="text" class="form-control">
            </div>
        </div>

        <div class="form-group col-sm-12">
            <div class="panel panel-primary">
                <div class="panel-heading ">Questions</div>
                    <table class="table">
                        <tbody>
                            <template v-for="question in newQuestions">
                                <tr class="col-xl-12" style="text-align:center">
                                    <td class="col-xl-5">
                                        <input id="name" type="text" class="form-control" style="text-align: center;" :value="question" disabled>
                                    </td>
                                    <td class="col-xl-1">
                                        <button class="btn btn-danger disabled">X</button>
                                    </td>
                                </tr>
                            </template>
                        </tbody>
                    </table>
                    <br/>
                    <button class="btn btn-primary disabled">Add extra question</button>
                    <br/>
                    <br/>
                </div>
            </div>
            <br/>
        <button class="btn btn-success" @click="saveOpen">Save and open</button>
        <button class="btn btn-success" @click="saveDraft" disabled>Save as draft</button>
    </div>
</div>
`;

newQuestions = [
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

app_setup_new = {
    template: app_setup_new_template,
    data() {
        return {
            newQuestions: newQuestions,
            periods: periods
        }
    }
};

Vue.component('app-setup-new', app_setup_new);

periods = [];

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

function saveOpen() {

    var name = $("#name").val();
    var period = $("#periods").val();
    var autoClose = $("#autoClose").val();
    var formNumber = $("#formNumber").val();
    var status = "Opened";

    // TBD
    evalID = period.split(")").join("_").split("(").join("_").split("#").join("_").split(" ").join("_") + "_form" + formNumber;
    coordinator = firebase.auth().currentUser.email.split(".").join(" ");

    update2DB("evaluation forms/" + coordinator + "/" + evalID, { autoClose: autoClose, status: status, terms: period, title: name });
}

function saveDraft() {

    var name = $("#name").val();
    var period = $("#periods").val();
    var autoClose = $("#autoClose").val();
    var formNumber = $("#formNumber").val();
    var status = "Drafted";

    // TBD
    evalID = period.split(")").join("_").split("(").join("_").split("#").join("_").split(" ").join("_") + "_form" + formNumber;
    coordinator = firebase.auth().currentUser.email.split(".").join(" ");

    update2DB("evaluation forms/" + coordinator + "/" + evalID, { autoClose: autoClose, status: status, terms: period, title: name });
}

