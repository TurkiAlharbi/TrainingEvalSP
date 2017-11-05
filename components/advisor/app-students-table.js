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

headers = ["Name", "Major", "Company", "Supervisor"];

var students = [];

setTimeout(function () {

    // Gets the advisor identifier (email)
    advisor = firebase.auth().currentUser.email.split(".").join(" ");

    // Connects to the advisors data
    firebase.database().ref("advisors/" + advisor + "/students").once('value', function (snapshot) {

        // Clears the old list
        while (students.length > 0)
            students.pop();

        // Gets the snapshot of the data (students of the advisors)
        vals = snapshot.val();

        // For each student in the new list
        for (var stu in vals) {

            // Connect to get the student's data
            firebase.database().ref("students/" + stu).once('value', function (snapshot2) {

                // Gets the snapshot of the data (current student's data)
                studentVals = snapshot2.val();

                var student = {};
                for (var key in studentVals) {
                    student[key] = studentVals[key];
                }

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
                    student.name = snapshot2.key + " <no contract>";
                }
                // Add to the list of students
                students.push(student);
            });
        }
    });
}, 1000);


app_students_table = {
    template: app_students_table_template,
    data() {
        return {
            students: students
        }
    }
};

Vue.component('app-students-table', app_students_table);