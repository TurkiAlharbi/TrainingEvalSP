app_remove_students_template = `
<table class="table table-bordered table-striped table-hover">
    <thead>
        <tr>
            <th v-for="header in headers">{{ header }}</th>
        </tr>
    </thead>
    <tbody>
        <tr v-for="student in students">
            <td> {{ student.name }} </td>
            <td> {{ student.id }} </td>
            <td> {{ student.major }} </td>
            <td> {{ student.advisor }} </td>
            <td> <button class="btn btn-danger" style="padding:0px 5px;">X</button> </td>
        </tr>
    </tbody>
</table>
`;

headers = ["Name", "ID", "Major", "Advisor", "Remove"];

students = [
    { name: "Ibrahim Al-Beladi", major: "ICS", advisor: "Husni Al-Muhtaseb", id: "201224780" },
];

app_remove_students = {
    template: app_remove_students_template,
};

Vue.component('app-remove-students', app_remove_students);