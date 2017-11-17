app_remove_students_template = `
<div>
    <v-text-field append-icon="search" label="Search" v-model="search"></v-text-field>

    <v-data-table v-bind:headers="headers" :items="students" v-bind:search="search" hide-actions class="elevation-1">
        <template slot="items" slot-scope="props">
            <td class="text-xs-center">{{ props.item.period }} </td>
            <td class="text-xs-center">{{ props.item.id }} </td>
            <td class="text-xs-center">{{ props.item.name }} </td>
            <td class="text-xs-center">{{ props.item.mobile }} </td>
            <td class="text-xs-center">{{ props.item.major }} </td>
            <td class="text-xs-center">{{ props.item.advisor }} </td>
            <td class="text-xs-center">{{ props.item.company }} </td>
            <td class="text-xs-center">{{ props.item.supervisor }} </td>
            <td class="text-xs-center">{{ props.item.supervisorMobile }} </td>
            <td class="text-xs-center"><v-btn color="red" flat icon @click="remStudent(props.item)">
                <v-icon>cancel</v-icon>
            </v-btn></td>
        </template>
    </v-data-table>
</div>
`;

var headers = [
    { text: "Term (Type)", value: "period", align: "center" },
    { text: "ID", value: "id", align: "center" },
    { text: 'Name', value: 'name', align: "center" },
    { text: 'Mobile', value: 'mobile', align: "center" },
    { text: 'Major', value: 'major', align: "center" },
    { text: 'Advisor', value: 'advisor', align: "center" },
    { text: 'Company', value: 'company', align: "center" },
    { text: 'Supervisor', value: 'supervisor', align: "center" },
    { text: 'Mobile', value: 'supervisorMobile', align: "center" },
    { text: 'Remove', align: "center", sortable: false },
];

var students = [];
var advisors = [];

function remStudent(student) {

    // Remove from the current view
    students.splice(students.indexOf(student), 1);

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
            student.name = "<no contract>";
        }

        // Add to the list of students
        students.push(student);
    });
}


app_remove_students = {
    template: app_remove_students_template,
    data() {
        return {
            students: students,
            search: "",
            advisors: advisors,
        };
    }
};

Vue.component('app-remove-students', app_remove_students);