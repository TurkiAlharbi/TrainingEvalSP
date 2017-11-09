template = `
<div>

    <div class="input-group">
        <span class="input-group-addon" style="min-width: 150px;"> Type: </span>
            <select class="form-control" id="options">
                <option>summer</option>
                <option>coop</option>
                <option>internship</option>
            </select>
    </div>
    <div class="input-group">
        <span class="input-group-addon" style="min-width: 150px;"> Term(s): </span>
        <input id="terms" type="text" class="form-control" placeholder="173 or 173 + 181">
    </div>
    <br/>
    <button class="btn btn-success" @click="addPeriods">Add period</button>

    <hr/>

    <div class="input-group">
        <span class="input-group-addon" style="min-width: 150px;"> Period: </span>
            <select class="form-control" id="periods">
                <option v-for="period in periods">{{ period }}</option>
            </select>
    </div>
    <div class="input-group">
        <span class="input-group-addon" style="min-width: 150px;"> Major: </span>
            <select class="form-control" id="majors">
                <option v-for="major in majors">{{ major }}</option>
            </select>
    </div>
    <div class="input-group">
        <span class="input-group-addon" style="min-width: 150px;"> IDs: </span>
        <input id="names" type="text" class="form-control" placeholder="Seperate by ,">
    </div>
    <br/>
    <button class="btn btn-success" @click="addStudents">Add students</button>
</div>
`;

var periods = [];
var majors = [];

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        console.log("updating view")
        updateView();
    }
});

function updateView() {

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
    });

    // Connects to the coordinator data
    firebase.database().ref("coordinators/" + coordinator + "/majors").once('value', function (snapshot) {

        // Clears the old list
        while (majors.length > 0)
            majors.pop();

        // Gets the snapshot of the data (majors of the coordinator)
        vals = snapshot.val();

        for (var i in vals)
            majors.push(vals[i]);
    });

}

app_add_student = {
    template: template,
    data() {
        return {
            periods: periods
        }
    }
}

Vue.component("app-add-student", app_add_student);



function addStudents() {
    var names = $('#names').val();
    var period = $("#periods :checked").val();
    var major = $("#majors :checked").val();

    if (names == "" || period == undefined || major == undefined)
        return;

    var json = {};

    names = names
        .replace(new RegExp(" ", 'g'), "")
        .replace(new RegExp("s", 'g'), "")
        .replace(new RegExp("S", 'g'), "")
        .split(",");
    errors = [];
    for (i in names) {
        id = parseInt(names[i]);
        // Change it by 2030
        if (id >= 201000000 && id <= 203000000) {
            json["s" + id] = "";
        }
        else {
            errors.push(names[i]);
        }
    }

    // Add to coordinator's students
    coordinator = firebase.auth().currentUser.email.split(".").join(" ");
    update2DB("coordinatorStudent/" + coordinator + "/" + period + "/" + major, json);

    //temp
    //Clears the input fields
    setTimeout(function () {
        $('#names').val("");
        msg = Object.keys(json).length + " student(s) are processed"
        if (errors.length != 0) {
            msg += ", and " + errors.length + " had errors processing: ";
            msg += errors.toString();
        }
        alert(msg);
    }, 1000);
}

function addPeriods() {
    var option = $("#options :checked").val();
    var terms = $("#terms").val();
    period = terms + " " + "(" + option + ")";
    if (terms == "")
        return;

    var json = { [period]: "" };

    // Add to coordinator's periods
    coordinator = firebase.auth().currentUser.email.split(".").join(" ");
    update2DB("coordinators/" + coordinator + "/terms", json);

}