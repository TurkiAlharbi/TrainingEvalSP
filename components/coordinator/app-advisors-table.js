app_advisors_table_template = `
<table class="table table-bordered table-striped table-hover">
    <thead>
        <tr>
            <th v-for="header in headers">{{ header }}</th>
        </tr>
    </thead>
    <tbody>
        <tr v-for="advisor in advisors">
            <td> {{ advisor.name }} </td>
            <td>
                <span v-for="(major, index) in advisor.majors">
                    <span v-if="!index">{{ major }}</span>
                    <span v-else>, {{ major }}</span>
                </span>
            </td>
            <td> {{ advisor.students }} </td>
        </tr>
    </tbody>
</table>
`;

headers = ["Name", "Majors", "Numbr of students"];

advisors = [
    { name: "Husni Al-Muhtaseb", majors: ["ICS", "SWE"], students: "55" },
];

app_advisors_table = {
    template: app_advisors_table_template,
};

Vue.component('app-advisors-table', app_advisors_table);