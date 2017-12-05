template = `
<div>
    <v-layout wrap>
        <v-flex xs12>
            <v-select label="Type" v-bind:items="types" v-model="type" required></v-select>
        </v-flex>
        <v-flex xs12>
            <v-select label="Term(s)" v-bind:items="terms" v-model="term" required></v-select>
        </v-flex>
        <v-flex xs12>
            <v-btn class="green white--text" @click="addPeriods(type,term)">Add period
                <v-icon dark right>check_circle</v-icon>
            </v-btn>
        </v-flex>
    </v-layout>
    <hr/>
    <v-layout wrap>
        <v-flex xs12>
            <v-select label="Periods" v-bind:items="periods" v-model="period" required></v-select>
        </v-flex>
        <v-flex xs12>
            <v-select label="Major" v-bind:items="majors" v-model="major" required></v-select>
        </v-flex>
        <v-flex xs12>
            <v-text-field label="IDs" v-model="names" placeholder="Seperate by ," required></v-text-field>
        </v-flex>
        <v-flex xs12>
            <v-btn class="green white--text" @click="addStudents(names,major,period)">Add
                <v-icon dark right>check_circle</v-icon>
            </v-btn>
        </v-flex>
    </v-layout>
</div>
`;

var periods = [];
var majors = [];
var terms = [
    "171", "172", "172 + 173", "173", "173 + 181",
    "181", "182", "182 + 183", "183", "183 + 191",
];
var types = ["summer", "coop", "internship"];

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
            periods: periods,
            period: '',
            types: types,
            type: types[0],
            terms: terms,
            term: terms[0],
            majors: majors,
            major: '',
            names: ''
        }
    }
}

Vue.component("app-add-student", app_add_student);

function addStudents(names, major, period) {
    // var names = $('#names').val();
    // var period = $("#periods :checked").val();
    // var major = $("#majors :checked").val();

    if (names == "" || period == undefined || major == undefined)
        return;

    var json = {};

    names = names
        .replace(new RegExp(" ", 'g'), "")
        .replace(new RegExp("s", 'g'), "")
        .replace(new RegExp("S", 'g'), "")
        .split(",");

    coordinator = firebase.auth().currentUser.email.split(".").join(" ");

    errors = [];
    for (i in names) {
        id = parseInt(names[i]);
        // Change it by 2030
        if (id >= 201000000 && id <= 203000000) {
            json["s" + id] = "";

            // Add to students list
            student = "s" + id;
            update2DB("students/" + student, { advisor: coordinator, coordinator: coordinator });
        }
        else {
            errors.push(names[i]);
        }
    }

    // Add to coordinator's students
    update2DB("coordinatorStudent/" + coordinator + "/" + period + "/" + major, json);

    // Add to advisor's (coordinator's) students
    update2DB("advisorStudent/" + coordinator + "/" + period + "/" + major, json);

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

function addPeriods(type, term) {
    period = term + " " + "(" + type + ")";
    if (term == "" || type == "")
        return;

    var json = { [period]: "" };

    // Add to coordinator's periods
    coordinator = firebase.auth().currentUser.email.split(".").join(" ");
    update2DB("coordinators/" + coordinator + "/terms", json);

}