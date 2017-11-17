app_students_table_template = `
<div>
    <v-text-field append-icon="search" label="Search" v-model="search"></v-text-field>

    <v-data-table v-bind:headers="headers" :items="students" v-bind:search="search" hide-actions class="elevation-1">
        <template slot="items" slot-scope="props">
            <td class="text-xs-center">{{ props.item.name }}</td>
            <td class="text-xs-center">{{ props.item.major }}</td>
            <td class="text-xs-center">{{ props.item.period }}</td>
            <td class="text-xs-center">{{ props.item.company }}</td>
            <td class="text-xs-center">{{ props.item.supervisor }}</td>
        </template>
    </v-data-table>
</div>
`;

var headers = [
    { text: 'Name', value: 'name', align: "center" },
    { text: 'Major', value: 'major', align: "center" },
    { text: 'Period', value: 'period', align: "center" },
    { text: 'Company', value: 'company', align: "center" },
    { text: 'Supervisor', value: 'supervisor', align: "center" },
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
        };

        // Get students data
        for (var key in studentVals)
            student[key] = studentVals[key];

        console.log(student);
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
            student.name = stu + " <no contract>";
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
        };
    }
};

Vue.component('app-students-table', app_students_table);