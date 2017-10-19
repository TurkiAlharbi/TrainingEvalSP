app_remove_advisors_template = `
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
            <td> <button class="btn btn-danger" style="padding:0px 5px;">X</button> </td>
        </tr>
    </tbody>
</table>
`;

headers = ["Name", "Majors", "Numbr of students","Remove"];

advisors = [
    { name: "Husni Al-Muhtaseb", majors: ["ICS", "SWE"], students: "55" },
];

app_remove_advisors = {
    template: app_remove_advisors_template,
};

Vue.component('app-remove-advisors', app_remove_advisors);