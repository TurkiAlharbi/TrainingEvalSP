app_marks_template = `
<table class="table table-striped table-hover table-bordered">
    <thead>
        <tr>
            <th v-for="header in headers" style="text-align: center">{{ header }}</th>
        </tr>
    </thead>
    <tbody>
        <tr v-for="student in students">
            <td>{{ student.id }}</td>
            <td>{{ student.name }}</td>
            <td>{{ student.company }}</td>
            <td>{{ student.supervisor }}</td>
            <td>{{ student.mark }}</td>
        </tr>
    </tbody>
</table>
`;

headers = ["ID", "Name", "Company", "Supervisor", "Mark"];

students = [
    { id: "201224780", name: "Ibrahim Al-Beladi", company: "Aramco", supervisor: "Maha Al-Dossary", mark: "35 / 40" },
    { id: "201237940", name: "Mohammed Alhumaidi", company: "Tweetso", supervisor: "Abdulrahman Alshehri", mark: "33 / 40" },
];

app_marks = {
    template: app_marks_template,
};

Vue.component('app-marks', app_marks);