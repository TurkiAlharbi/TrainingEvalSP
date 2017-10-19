app_evaluations_table_template = `
<table class="table table-bordered table-striped table-hover">
    <thead>
        <tr>
            <th v-for="header in headers">{{ header }}</th>
        </tr>
    </thead>
    <tbody>
        <tr v-for="evaluation in evaluations">
            <td> {{ evaluation.id }} </td>
            <td> {{ evaluation.title }} </td>
            <td> 
                <span v-for="(term, index) in evaluation.terms">
                    <span v-if="!index">{{ term }}</span>
                    <span v-else>, {{ term }}</span>
                </span>
            </td>
            <td> {{ evaluation.status }} </td>
            <td> {{ evaluation.numOfEvals }} </td>
            
        </tr>
    </tbody>
</table>
`;

headers = ["Id", "Title", "Terms", "Status", "Number of evaluations"];

evaluations = [
    { id: "1", title: "Summer training form", terms: [163], status: "Opened", numOfEvals: "53" },
    { id: "2", title: "Coop form #1", terms: [163, 171], status: "Closed", numOfEvals: "2" },
    { id: "3", title: "Coop form #2", terms: [163, 171], status: "Drafted", numOfEvals: "-" },
];

app_evaluations_table = {
    template: app_evaluations_table_template,
};

Vue.component('app-evaluations-table', app_evaluations_table);