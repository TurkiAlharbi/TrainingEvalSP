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

contracts = [
    {
        id: "1", hash: "#1", name: "Ibrahim Al-Beladi", type: "Summer", company: "Aramco",
        info: { country: "Saudi Arabia", city: "Dhahran", location: "Expec II", supervisor: "Maha Dossary", cid: "1" }
    },
    {
        id: "2", hash: "#2", name: "Mohammed Alhumaidi", type: "Summer", company: "Tweetso",
        info: { country: "Saudi Arabia", city: "Dhahran", location: "Techno Valley", supervisor: "Abdulrahman Alshehri", cid:"2"}
    },
    {
        id: "3", hash: "#3", name: "Ibrahim Al-Beladi" ,type: "Summer"
    },
    {
        id: "4", hash: "#4", name: "Ibrahim Al-Beladi" ,type: "COOP"
    },
    {
        id: "5", hash: "#5", name: "Ibrahim Al-Beladi" ,type: "Summer"
    },
    id: "5", hash: "#5", name: "Ibrahim Al-Beladi" ,type: "Summer"
    },
];

app_contracts = {
    template: app_contracts_template,
};

Vue.component('app-contracts-table', app_contracts);