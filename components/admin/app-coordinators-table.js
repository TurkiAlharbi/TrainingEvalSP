app_coordinators_table_template = `
<table class="table table-bordered table-striped table-hover">
    <thead>
        <tr>
            <th v-for="header in headers">{{ header }}</th>
        </tr>
    </thead>
    <tbody>
        <tr v-for="coordinator in coordinators">
            <td> {{ coordinator.name }} </td>
            <td>
                <span v-for="(major, index) in coordinator.majors">
                    <span v-if="!index">{{ major }}</span>
                    <span v-else>, {{ major }}</span>
                </span>
            </td>
            <td> {{ coordinator.students }} </td>
        </tr>
    </tbody>
</table>
`;

headers = ["Name", "Majors", "Numbr of students"];

coordinators = [
    { name: "Husni Al-Muhtaseb", majors: ["ICS", "SWE"], students: "55" },
    { name: "Yahya Osais", majors: ["COE"], students: "10" },
    { name: "Mohammed Antar", majors: ["ME"], students: "100" },
];

app_coordinators_table = {
    template: app_coordinators_table_template,
};

Vue.component('app-coordinators-table', app_coordinators_table);