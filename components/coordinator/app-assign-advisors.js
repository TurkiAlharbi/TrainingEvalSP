app_assign_advisors_template = `
<div>
    <button class="btn btn-info" @click="distribute">Distribute students over advisors</button>
    
    <hr/>

    <div>
        <p>Click to select multiple students, drag to the new advisor</p>
        <div class="row">

            <div class="col-xs-12" v-if="students.length != 0">
                <div class="panel panel-primary">
                    <div class="panel-heading">
                        <h1 class="panel-title">Without an advisor</h1>
                    </div>
                    <div class="panel-body" style="background: #eee">
                        <ul class="draggable" id="Without an advisor">
                            <li v-for="student in students">{{student}}</li>
                        </ul>
                    </div>
                </div>
            </div>
            
            <div v-for="advisor in advisors" class="col-xs-12 col-sm-6 col-md-4 col-md-3">
                <div class="panel panel-primary">
                    <div class="panel-heading">
                        <h1 class="panel-title">{{advisor.title}}</h1>
                    </div>
                    <div class="panel-body" style="background: #eee">
                        <ul class="draggable" :id="advisor.title">
                            <li v-for="student in advisor.students">{{student}}</li>
                        </ul>
                    </div>
                </div>
            </div>

        </div>
    </div>

    <button class="btn btn-success">Save</button>
</div>
`;

students = [];
advisors = [];

app_assign_advisors = {
    template: app_assign_advisors_template,
};

Vue.component('app-assign-advisors', app_assign_advisors);

function distribute() {
    console.log("TBD");
    radios = $("input:radio");
    adv = advisors.length;
    stu = students.length;
    for (var s = 0; s < stu; s++)
        for (var a = 0; a < adv; a++)
            if (s % adv == a % adv)
                radios[s * adv + a].click();
}
setState()
function setState() {
    students = ["Student #1", "Student #2", "Student #3", "Student #4", "Student #5", "Student #6", "Student #7"];

    advisors = [
        { title: "Advisor #1", students: ["Student #8", "Student #9"] },
        { title: "Advisor #2", students: ["Student #10"] },
    ];
}

function getState() {
    lists = $("ul");
    for (i = 0; i < lists.length; i++) {
        children = lists[i].children;
        for (s = 0; s < children.length; s++) {
            console.log(lists[i].id + " <- " + children[s].innerHTML);
        }
    }
}

$(document).ready(function () {

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

});