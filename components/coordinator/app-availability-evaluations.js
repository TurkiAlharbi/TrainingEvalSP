app_availability_evaluations_template = `
<table class="table table-bordered table-striped">
    <thead>
        <tr>
            <th v-for="header in headers">{{ header }}</th>
        </tr>
    </thead>
    <tbody>

        <template v-for="(eval,index) in evaluations">
        
                    <tr data-toggle="collapse" data-parent="#accordion" :href="eval.hash">
                        <td> {{ eval.id }} </td>
                        <td> {{ eval.title }} </td>
                        <td> 
                            <span v-for="(term, index) in eval.terms">
                                <span v-if="!index">{{ term }}</span>
                                <span v-else>, {{ term }}</span>
                            </span>
                        </td>
                    </tr>
                    
                    <tr>
                        <div :id="eval.id" class="panel-collapse collapse">
                            <div class="panel-body">
                                <p>Status: {{ eval.status }}</p>
                                <p v-if="eval.status != 'Drafted'">Number of evaluations: {{ eval.numOfEvals }}</p>
                                <button class="btn btn-info" v-if="eval.status == 'Drafted'">Save & Open</button>
                                <button class="btn btn-success"  v-if="eval.status == 'Closed'">Open</button>
                                <p v-if="eval.status =='Opened'">Will be closed automatically in {{eval.autoClose}}</p>
                                <button class="btn btn-danger" v-if="eval.status == 'Opened'">Close now</button>
                            </div>
                        </div>
                    </tr>
        
                    <tr></tr>
                    <tr></tr>
            
        </template>
    </tbody>
</table>
`;

headers = ["Id", "Title", "Terms"];

evaluations = [
    { hash: "#1", id: "1", title: "Summer training form", terms: [163], status: "Opened", numOfEvals: "53", autoClose: "20 days" },
    { hash: "#2", id: "2", title: "Coop form #1", terms: [163, 171], status: "Closed", numOfEvals: "2" },
    { hash: "#3", id: "3", title: "Coop form #2", terms: [163, 171], status: "Drafted", numOfEvals: "0" },
];

app_availability_evaluations = {
    template: app_availability_evaluations_template,
};

Vue.component('app-availability-evaluations', app_availability_evaluations);