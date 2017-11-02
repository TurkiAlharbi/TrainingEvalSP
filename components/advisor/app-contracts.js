app_contracts_template = `
<table class="table table-bordered">
    <thead>
        <tr>
            <th v-for="header in headers">{{ header }}</th>
        </tr>
    </thead>
    <tbody>

        <template v-for="(contract,index) in contracts">

            <tr data-toggle="collapse" data-parent="#accordion" :href="contract.hash">
                <td> {{ contract.name }} </td>
                <td> {{ contract.type }} </td>
                <td> {{ contract.company }} </td>
            </tr>
            
            <tr>
                <div v-if="contract.company" :id="contract.id" class="panel-collapse collapse">
                    <div class="panel-body">
                        
                        <p>Country: {{ contract.info.country }}</p>
                        <p>City: {{ contract.info.city }}</p>
                        <p>Location: {{ contract.info.location }}</p>
                        <p>Supervisor: {{ contract.info.supervisor }}</p>
                        <a> More details</a>
                        
                    </div>
                </div>
            </tr>

            <tr>
            
            </tr>
            
        </template>

    </tbody>
</table>


`;

headers = ["Student Name", "Type", "Company"];

var conRef = firebase.database().ref('contracts/');
var contracts = [];

conRef.on('value', function (snapshot) {
    while (contracts.length > 0)
        contracts.pop();

    vals = snapshot.val();

    for (var key in vals) {
        con = vals[key];
        // con["email"] = key.split(" ").join(".");
        con["contracts"] = "TBD";
        contracts.push(con);
    }
});

app_contracts_table = {
    template: app_contracts_table_template,
    data() {
        return {
            contracts: contracts
        }
    }
};

Vue.component('app-contracts-table', app_contracts);