app_remove_students_template = `
<table class="table table-bordered table-striped table-hover">
    <thead>
        <tr>
            <th v-for="header in headers">{{ header }}</th>
        </tr>
    </thead>
    <tbody>
        <tr v-for="student in students" v-if="student.show">
            <td> {{ student.id }} </td>
            <td> {{ student.name }} </td>
            <td> {{ student.major }} </td>
            <td> {{ student.advisor }} </td>
            <td> <button class="btn btn-danger" style="padding:0px 5px;" @click="remStudent(student)">X</button> </td>
        </tr>
    </tbody>
</table>
`;

headers = ["ID", "Name", "Major", "Advisor", "Remove"];

function remStudent(student) {

    // Remove from advisors's list
    if (student.advisor)
        firebase.database().ref('advisors/' + student.advisor.split(".").join(" ") + '/students/' + student.id).remove();

    // Remove from coordinator's list
    coordinator = firebase.auth().currentUser.email.split(".").join(" ");
    firebase.database().ref('coordinators/' + coordinator + '/students/' + student.id).remove();

    // Remove from students list
    firebase.database().ref('students/' + student.id).remove();

    // Hide from table
    student.show = false;
}

var students = [];

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        console.log("updating view")
        updateView();
    }
});

function updateView() {

    // Gets the cooridnator identifier (email)
    coordinator = firebase.auth().currentUser.email.split(".").join(" ");

    // Connects to the coordinator data
    firebase.database().ref("coordinators/" + coordinator + "/students").once('value', function (snapshot) {

        // Clears the old list
        while (students.length > 0)
            students.pop();

        // Gets the snapshot of the data (students of the coordinator)
        vals = snapshot.val();

        // For each student in the new list
        for (var stu in vals) {

            // Connect to get the student's data
            firebase.database().ref("students/" + stu).once('value', function (snapshot2) {

                // Gets the snapshot of the data (current student's data)
                studentVals = snapshot2.val();

                var student = { show: true };

                for (var key in studentVals) {
                    student[key] = studentVals[key];
                }

                student.id = snapshot2.key;

                // Add to the list of students
                students.push(student);
            });
        }
    });
}


app_remove_students = {
    template: app_remove_students_template,
    data() {
        return {
            students: students
        }
    }
};

Vue.component('app-remove-students', app_remove_students);