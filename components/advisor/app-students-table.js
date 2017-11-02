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

var stuRef = firebase.database().ref('students/');
var students = [];

stuRef.on('value', function (snapshot) {
    while (students.length > 0)
        students.pop();

    vals = snapshot.val();

    for (var key in vals) {
        stu = vals[key];
        // stu["email"] = key.split(" ").join(".");
        stu["students"] = "TBD";
        students.push(stu);
    }
});

app_students_table = {
    template: app_students_table_template,
    data() {
        return {
            students: students
        }
    }
};

Vue.component('app-students-table', app_students_table);