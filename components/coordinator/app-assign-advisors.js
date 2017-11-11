app_assign_advisors_template = `
<div>
    <div class="input-group">
    <span class="input-group-addon" style="min-width: 150px;"> Period: </span>
        <select class="form-control" id="periods">
            <option v-for="period in periods">{{ period }}</option>
        </select>
    </div>
    <br/>
    <button class="btn btn-success" @click="viewPeriod">Show</button>
    <hr/>
    <div>
        <p>Click to select multiple students, drag to the new advisor</p>
        <div class="row">

            <div class="col-xs-12">
                <div class="panel panel-primary">
                    <div class="panel-heading">
                        <h1 class="panel-title">( without advisor )</h1>
                    </div>
                    <div class="panel-body" style="background: #eee">
                        <ol class="draggable" :id="coord.email">
                            <template v-for="student in coord.students">
                                <li :id="student.id">{{ student.name }} ({{student.major}})</li>
                            </template>
                        </ol>
                    </div>
                </div>
            </div>
            
            <div v-for="advisor in advisors" class="col-xs-12 col-sm-6 col-md-4 col-md-3">
                <div class="panel panel-primary">
                    <div class="panel-heading">
                        <h1 class="panel-title">{{ advisor.name }}</h1>
                    </div>
                    <div class="panel-body" style="background: #eee">
                        <ol class="draggable" :id="advisor.email">
                            <template v-for="student in advisor.students">
                                <li :id="student.id">{{ student.name }} ({{student.major}})</li>
                            </template>
                        </ol>
                    </div>
                </div>
            </div>

        </div>
    </div>

    <button class="btn btn-success" @click="setState">Save</button>
</div>
`;

var advisors = [];
var coord = { students: [] };
var periods = [];
var term = "172 (internship)";

app_assign_advisors = {
    template: app_assign_advisors_template,
    data() {
        return {
            periods: periods,
            advisors: advisors
        }
    },
};

Vue.component('app-assign-advisors', app_assign_advisors);

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        console.log("updating view")
        updateView();
    }
});

function updateView() {
    getPeriods();
}

function getCoordinator() {

    // Clears the old list
    coord.students = [];

    // Gets the cooridnator identifier (email)
    coord.email = firebase.auth().currentUser.email.split(".").join(" ");

    // Connect to the advisors data
    firebase.database().ref("advisorStudent/" + coord.email + "/" + term).once('value', function (snapshot2) {

        // Gets the snapshot of the data (current advisor's data)
        coordVals = snapshot2.val();

        for (var major in coordVals) {
            for (var stu in coordVals[major]) {

                firebase.database().ref("students/" + stu + "/name").once('value', function (snapshot3) {
                    name = snapshot3.val();
                    if (name == "null")
                        name = "<no contract>";
                    coord.students.push({ id: stu, name: name, major: major })

                });
            }
        }
    });

    setTimeout(function () {
        makeDraggable();
    }, 2500);

}

function viewPeriod() {
    term = $("#periods").val();
    getAdvisors();
    getCoordinator();
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
        for (var adv in vals) {
            getAdvisors2(adv, term)
        }
    });
}

function getAdvisors2(adv, term) {
    // Connect to the advisors data
    firebase.database().ref("advisorStudent/" + adv + "/" + term).once('value', function (snapshot2) {

        // Gets the snapshot of the data (current advisor's data)
        advisorVals = snapshot2.val();

        var advisor = {
            email: adv,
            students: []
        };

        if (advisorVals != null) {
            for (var major in advisorVals) {
                for (var stu in advisorVals[major]) {

                    firebase.database().ref("students/" + stu + "/name").once('value', function (snapshot3) {
                        name = snapshot3.val();
                        if (name == "null")
                            name = "<no contract>";
                        advisor.students.push({ id: stu, name: name, major: major })
                    });
                }
            }
        }

        firebase.database().ref("advisors/" + adv + "/name").once('value', function (snapshot4) {

            // Gets the snapshot of the data (current advisor's data)
            advisor.name = snapshot4.val();

            // Add to the list of advisors
            advisors.push(advisor);
        })

    });
}

function setState() {
    lists = $("ol");
    stud = [];

    // Get students
    for (i = 0; i < lists.length; i++) {
        children = lists[i].children;
        for (s = 0; s < children.length; s++) {
            major = $("ol")[i].children[s].innerHTML.replace(new RegExp(".*[(]", 'g'), "").replace(new RegExp("[)].*", 'g'), "")
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
            major = $("ol")[i].children[s].innerHTML.replace(new RegExp(".*[(]", 'g'), "").replace(new RegExp("[)].*", 'g'), "")
            advisor = lists[i].id.split(".").join(" ");
            student = children[s].id;
            update2DB("advisorStudent/" + advisor + "/" + term + "/" + major, { [student]: "" });
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