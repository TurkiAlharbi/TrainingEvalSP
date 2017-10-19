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

students = [
    { name: "Ibrahim Al-Beladi", coordinator: "Husni Al-Muhtaseb", advisor: "Husni Al-Muhtaseb" },
];

app_students_table = {
    template: app_students_table_template,
};

Vue.component('app-students-table', app_students_table);