app_remove_students_template = `
<div class="table-responsive">
    <table class="table table-bordered table-striped table-hover" style="margin-bottom:25px">
        <thead>
            <tr>
                <th v-for="header in headers">{{ header }}</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="student in students" v-if="student.show">
                <td> {{ student.period }} </td>
                <td> {{ student.id }} </td>
                <td> {{ student.name }} </td>
                <td> {{ student.mobile }} </td>
                <td> {{ student.major }} </td>
                <td> {{ student.advisor }} </td>
                <td> {{ student.company }} </td>
                <td> {{ student.supervisor }} </td>
                <td> {{ student.supervisorMobile }} </td>
                <td> <button class="btn btn-danger" style="padding:0px 5px;" @click="remStudent(student)">X</button> </td> 
            </tr>
        </tbody>
    </table>
</div>
`;

headers = ["Term (Type)", "ID", "Name","Mobile", "Major", "Advisor", "Company", "Supervisor","Mobile", "Remove"];

function remStudent(student) {

    // Remove from coordinator's list
    coordinator = firebase.auth().currentUser.email.split(".").join(" ");
    firebase.database().ref('coordinatorStudent/' + coordinator + '/' + student.period + "/" + student.major + "/" + student.id).remove();

    // Remove from advisor's list
    firebase.database().ref('advisorStudent/' + student.advisorEmail.split(".").join(" ") + '/' + student.period + "/" + student.major + "/" + student.id).remove();

    // Remove from students list
    // firebase.database().ref('students/' + student.id).remove();

    // Hide from table
    student.show = false;
}

var students = [];

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        console.log("updating view");
        updateView();
    }
});

function updateView() {

    // Gets email (identifier)
    coordinator = firebase.auth().currentUser.email.split(".").join(" ");

    // Connects to the coordinator data
    firebase.database().ref("coordinatorStudent/" + coordinator).once('value', function (snapshot) {

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
            show: true,
            period: term,
            id: snapshot2.key,
            major: major.toUpperCase(),
            advisorEmail: studentVals.advisor,
            mobile: studentVals.mobile,
        };

        // Get students data
        for (var key in studentVals)
            student[key] = studentVals[key];

        // Trying to get the student's advisor's data
        try {
            firebase.database().ref("advisors/" + student.advisorEmail.split(".").join(" ")).once('value', function (snapshot3) {
                advVals = snapshot3.val();
                student.advisor = advVals.name;
            });
        } catch (err) {
            console.log(err.name);
        }

        // Trying to get the student's supervisor's data
        try {
            firebase.database().ref("supervisors/" + student.supervisor.split(".").join(" ")).once('value', function (snapshot4) {
                supVals = snapshot4.val();
                student.supervisor = supVals.name;
                student.supervisorMobile = supVals.mobile;
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


app_remove_students = {
    template: app_remove_students_template,
    data() {
        return {
            students: students
        };
    }
};

Vue.component('app-remove-students', app_remove_students);