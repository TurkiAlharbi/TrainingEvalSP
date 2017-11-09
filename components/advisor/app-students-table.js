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
            <td> {{ student.major }} </td>
            <td> {{ student.company }} </td>
            <td> {{ student.supervisor }} </td>
        </tr>
    </tbody>
</table>
`;

var headers = ["Name", "Major", "Company", "Supervisor"];

var students = [];

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        console.log("updating view")
        updateView();
    }
});

function updateView() {

    // Gets email (identifier)
    advisor = firebase.auth().currentUser.email.split(".").join(" ");

    // Connects to the coordinator data
    firebase.database().ref("advisorStudent/" + advisor).once('value', function (snapshot) {

        // Clears the old list
        while (students.length > 0)
            students.pop();

        // Gets the snapshot of the data (students of the coordinator)
        vals = snapshot.val();

        // For each term
        for (var term in vals) {
            // For each major
            for (var major in vals[term]) {
                // For each student 
                for (var stu in vals[term][major]) {
                    fetchStudent(stu, major, term, vals);
                }
            }
        }
    });
}

function fetchStudent(stu, major, term, vals) {

    // Connect to get the student's data
    firebase.database().ref("students/" + stu).once('value', function (snapshot2) {

        // Gets the snapshot of the data (current student's data)
        studentVals = snapshot2.val();

        // Stores the students data
        var student = {
            period: term,
            id: snapshot2.key,
            major: major.toUpperCase(),
            supervisor: vals[term][major][snapshot2.key].supervisor,
            company: "TBD",
        };

        // Get students data
        for (var key in studentVals)
            student[key] = studentVals[key];

        // Trying to get the student's supervisor's data
        try {
            firebase.database().ref("supervisors/" + student.supervisor.split(".").join(" ")).once('value', function (snapshot4) {
                supVals = snapshot4.val();
                student.supervisor = supVals.name;
            });
        } catch (err) {
            console.log(err.name);
        }

        // Highlight not submitting the contract yet
        if (student.name == undefined) {
            student.name = " <no contract>";
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