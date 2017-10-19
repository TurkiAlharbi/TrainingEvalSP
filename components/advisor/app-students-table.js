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

students = [
    { name: "Ibrahim Al-Beladi", major: "ICS", company: "Aramco", supervisor: "Maha Al-Dossary" },
    
];

app_students_table = {
    template: app_students_table_template,
};

Vue.component('app-students-table', app_students_table);