app_students_table_template = `
<div>
<v-text-field append-icon="search" label="Search" v-model="search"></v-text-field>

<v-data-table v-bind:headers="headers" :items="students" v-bind:search="search" hide-actions class="elevation-1">
    <template slot="items" slot-scope="props">
        <td class="text-xs-center">{{ props.item.name }}</td>
        <td class="text-xs-center">{{ props.item.coordinator }}</td>
        <td class="text-xs-center">{{ props.item.advisor }}</td>
    </template>
</v-data-table>
</div>
`;

var headers = [
    { text: 'Name', value: 'name', align: "center" },
    { text: 'Coordinator', value: 'coordinator', align: "center" },
    { text: 'Advisor', value: 'advisor', align: "center" },
];

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
            students: students,
            search: ''
        }
    }
};

Vue.component('app-students-table', app_students_table);