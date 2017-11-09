app_students_table_template = `
<table class="table table-bordered table-striped table-hover">
    <thead>
        <tr>
            <th v-for="header in headers">{{ header }}</th>
        </tr>
    </thead>
    <tbody>
        <tr v-for="student in students">
            <td> {{ student.name }} </td>
            <td> {{ student.coordinator }} </td>
            <td> {{ student.advisor }} </td>
        </tr>
    </tbody>
</table>
`;

headers = ["Name", "Coordinator", "Advisor"];

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
            id: snapshot2.key,
        };

        // Get students data
        for (var key in studentVals)
            student[key] = studentVals[key];

        // Trying to get the student's advisor's data
        try {
            firebase.database().ref("advisors/" + student.advisor.split(".").join(" ")).once('value', function (snapshot4) {
                advVals = snapshot4.val();
                student.advisor = advVals.name;
            });
        } catch (err) {
            console.log(err.name);
        }

        // Trying to get the student's coordinator's data
        try {
            firebase.database().ref("coordinators/" + student.coordinator.split(".").join(" ")).once('value', function (snapshot5) {
                corVals = snapshot5.val();
                student.coordinator = corVals.name;
            });
        } catch (err) {
            console.log(err.name);
        }

        // Add to the list of students
        students.push(student);
    });
}

app_students_table = {
    template: app_students_table_template,
    data() {
        return {
            students: students
        }
    }
};

Vue.component('app-students-table', app_students_table);