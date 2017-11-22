app_assign_advisors_template = `
<div>
    <v-layout wrap row>
        <v-flex xs12>
            <v-select label="Periods" v-bind:items="periods" v-model="period" id="periods" required></v-select>
        </v-flex>
        <v-flex xs12>
            <v-btn class="green white--text" @click="if(viewPeriod(period))view = true">Show
                <v-icon dark right>list</v-icon>
            </v-btn>
        </v-flex>
    </v-layout>
    
    <div v-if="view">
        <v-layout wrap>       
            <v-flex xs12>
                <p>Click to select multiple students, drag to the new advisor</p>
            </v-flex>

            <v-flex xs12>
                <app-dashboard :title="coord.name">
                    <ol class="draggable text-xs-center" id="coordinator">
                        <template v-for="student in coord.students">
                            <li :id="student.id">{{ student.name }} ({{student.major}})</li>
                        </template>
                    </ol>
                </app-dashboard>
            </v-flex>
            
            <v-flex v-for="advisor in advisors" xs12 sm6 md4 lg3>
                <app-dashboard :title="advisor.name">
                    <ol class="draggable text-xs-center" :id="advisor.email">
                        <template v-for="student in advisor.students">
                            <li :id="student.id">{{ student.name }} ({{student.major}})</li>
                        </template>
                    </ol>
                </app-dashboard>
            </v-flex>

        </v-layout>
        <v-btn class="green white--text" @click="setState">Save
            <v-icon dark right>save</v-icon>
        </v-btn>
    </div>

</div>
`;

var advisors = [];
var allStudents = [];
var coord = { students: [] };
var periods = [];
var period = "";
var term = "172 (internship)";
var view = false;

app_assign_advisors = {
    template: app_assign_advisors_template,
    data() {
        return {
            periods: periods,
            period: period,
            advisors: advisors,
            view: view,
            allStudents: allStudents,
        };
    },
};

Vue.component('app-assign-advisors', app_assign_advisors);

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        console.log("updating view");
        updateView();
    }
});

function updateView() {
    getPeriods();
}

function getCoordinator() {

    // Clears the old list
    while (coord.students.length > 0)
        coord.students.pop();

    $("#coordinator").html("")

    while (allStudents.length > 0)
        allStudents.pop();

    // Gets the cooridnator identifier (email)
    coord.email = firebase.auth().currentUser.email.split(".").join(" ");

    // Connect to the advisors data
    firebase.database().ref("advisorStudent/" + coord.email + "/" + term).once('value', function (snapshot2) {

        // Gets the snapshot of the data (current advisor's data)
        coordVals = snapshot2.val();

        for (var major in coordVals) {
            for (var stu in coordVals[major]) {
                console.log(coordVals[major][stu]);
                addCoordStudent(major, stu);
            }
        }
    });

    // Gets the name of the coordinator
    firebase.database().ref("coordinators/" + coord.email + "/" + "name").once('value', function (snapshot2) {
        coord.name = snapshot2.val();
    });

    setInterval(function () {
        makeDraggable();
    }, 500);

}

function addCoordStudent(major, stu) {
    firebase.database().ref("students/" + stu + "/name").once('value', function (snapshot3) {
        name = snapshot3.val();
        if (name == "null")
            name = stu;
        coord.students.push({ id: stu, name: name, major: major });
        allStudents.push({ id: stu, name: name, major: major });
    });
}

function viewPeriod(period) {
    if (period == "")
        return;

    term = period;

    // Clears the old coordinator's list
    $("#students").html("");

    getAdvisors();
    getCoordinator();

    return true;
}

function getPeriods() {

    // Clears the old list
    while (periods.length > 0)
        periods.pop();

    // Gets email (identifier)
    coordinator = firebase.auth().currentUser.email.split(".").join(" ");

    // Connects to the coordinator data
    firebase.database().ref("coordinators/" + coordinator + "/terms").once('value', function (snapshot) {

        // Gets the snapshot of the data (periods of the coordinator)
        vals = snapshot.val();

        for (var i in vals) {
            periods.push(i);
        }
    });
}

function getAdvisors() {

    // Gets the cooridnator identifier (email)
    coordinator = firebase.auth().currentUser.email.split(".").join(" ");

    // Connects to the coordinator data
    firebase.database().ref("coordinators/" + coordinator + "/advisors").once('value', function (snapshot) {
        // Clears the old list
        while (advisors.length > 0)
            advisors.pop();

        // Gets the snapshot of the data (advisors of the coordinator)
        vals = snapshot.val();

        // For each advisor in the new list
        for (var adv in vals)
            getAdvisors2(adv, term);

    });
}

function getAdvisors2(adv, term) {

    // Connect to the advisors data
    firebase.database().ref("advisorStudent/" + adv + "/" + term).once('value', function (snapshot2) {
        getAdvisors3(snapshot2.val(), adv);
    });

}

function getAdvisors3(advisorVals, adv) {

    var advisor = {
        email: adv,
        students: []
    };

    if (advisorVals != null)
        for (var major in advisorVals)
            for (var stu in advisorVals[major])
                getAdvisors4(stu, major, advisor);

    firebase.database().ref("advisors/" + adv + "/name").once('value', function (snapshot4) {

        // Gets the snapshot of the data (current advisor's data)
        advisor.name = snapshot4.val();

        // Add to the list of advisors
        advisors.push(advisor);

    });

}

function getAdvisors4(stu, major, advisor) {
    firebase.database().ref("students/" + stu + "/name").once('value', function (snapshot3) {
        name = snapshot3.val();
        if (name == "null")
            name = stu;
        advisor.students.push({ id: stu, name: name, major: major });
        allStudents.push({ id: stu, name: name, major: major });
    });
}

function setState() {
    var lists = $("ol");
    var stud = [];

    // Get students
    for (i = 0; i < lists.length; i++) {
        children = lists[i].children;
        for (s = 0; s < children.length; s++) {
            major = $("ol")[i].children[s].innerHTML.replace(new RegExp(".*[(]", 'g'), "").replace(new RegExp("[)].*", 'g'), "");
            stud.push({ id: children[s].id, major: major });
        }
    }

    // Remove form the old lists
    for (i = 0; i < lists.length; i++) {
        children = lists[i].children;
        for (s = 0; s < stud.length; s++) {
            advisor = lists[i].id.split(".").join(" ");
            major = stud[s].major;
            student = stud[s].id;
            update2DB("advisorStudent/" + advisor + "/" + term + "/" + major, { [student]: null });
        }
    }

    // Add to the new lists
    for (i = 0; i < lists.length; i++) {
        children = lists[i].children;
        for (s = 0; s < children.length; s++) {
            major = $("ol")[i].children[s].innerHTML.replace(new RegExp(".*[(]", 'g'), "").replace(new RegExp("[)].*", 'g'), "");
            advisor = lists[i].id.split(".").join(" ");
            student = children[s].id;
            update2DB("advisorStudent/" + advisor + "/" + term + "/" + major, { [student]: "" });
            update2DB("students/" + student, { "advisor": advisor });
        }
    }

}

function makeDraggable() {

    var selectedClass = 'ui-state-highlight',
        clickDelay = 600,
        // click time (milliseconds)
        lastClick, diffClick; // timestamps

    $(".draggable li")
        // Script to deferentiate a click from a mousedown for drag event
        .bind('mousedown mouseup', function (e) {
            if (e.type == "mousedown") {
                lastClick = e.timeStamp; // get mousedown time
            } else {
                diffClick = e.timeStamp - lastClick;
                if (diffClick < clickDelay) {
                    // add selected class to group draggable objects
                    $(this).toggleClass(selectedClass);
                }
            }
        })
        .draggable({
            revertDuration: 10,
            // grouped items animate separately, so leave this number low
            containment: '.demo',
            start: function (e, ui) {
                ui.helper.addClass(selectedClass);
            },
            stop: function (e, ui) {
                // reset group positions
                $('.' + selectedClass).css({
                    top: 0,
                    left: 0
                });
            },
            drag: function (e, ui) {
                // set selected group position to main dragged object
                // this works because the position is relative to the starting position
                $('.' + selectedClass).css({
                    top: ui.position.top,
                    left: ui.position.left
                });
            }
        });

    $(".draggable").sortable().droppable({
        drop: function (e, ui) {
            $('.' + selectedClass).appendTo($(this)).add(ui.draggable) // ui.draggable is appended by the script, so add it after
                .removeClass(selectedClass).css({
                    top: 0,
                    left: 0
                });
        }
    });

}