app_remove_advisors_template = `
<div>
    <v-text-field append-icon="search" label="Search" v-model="search"></v-text-field>
    
    <v-data-table v-bind:headers="headers" :items="advisors" v-bind:search="search" hide-actions class="elevation-1">
        <template slot="items" slot-scope="props">
            <td class="text-xs-center">{{ props.item.name }}</td>
            <td class="text-xs-center">{{ props.item.email }}</td>
            <td class="text-xs-center">{{ props.item.students }}</td>

            <td class="text-xs-center" v-if="!props.item.students">
                <v-btn color="red" flat icon @click="remAdv(props.item)">
                    <v-icon>cancel</v-icon>
                </v-btn>
            </td>
            <td class="text-xs-center" v-else>
                <v-btn color="red" flat icon disabled>
                    <v-icon>cancel</v-icon>
                </v-btn>
            </td>
        </template>
    </v-data-table>
    
    <br/>
    
    <v-layout justify-center v-if="advisors.length != 0">
        <v-btn class="green white--text" @click="exportCurrentView">Save current view as xls</v-btn>
    </v-layout>
</div>
`;

var headers = [
    { text: 'Name', value: 'name', align: "center" },
    { text: 'Email', value: 'email', align: "center" },
    { text: 'Number of students', value: 'number', align: "center" },
    { text: 'Remove', align: "center", sortable: false },
];

function remAdv(adv) {

    // Remove from the current view
    advisors.splice(advisors.indexOf(adv), 1);

    // Remove from advisors list
    firebase.database().ref('advisors/' + adv.id).remove();

    // Remove from coordinator's list
    firebase.database().ref('coordinators/' + coordinator + '/advisors/' + adv.id).remove();

    //temp // Disables account -> remove account
    write2DB('users/' + adv.id, { type: "disabled" });

    //TODO // Removes account
    // removeUser()

}

var advisors = [];
var coordinator;
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        console.log("updating view")
        updateView();
    }
});

function updateView() {
    getAdvisors();
}


function getAdvisors() {

    // Gets the cooridnator identifier (email)
    coordinator = firebase.auth().currentUser.email.split(".").join(" ");

    // Connects to the coordinator data
    firebase.database().ref("coordinators/" + coordinator + "/advisors").once('value', function (snapshot) {
        // Clears the old list
        while (advisors.length > 0)
            advisors.pop();

        // Gets the snapshot of the data (advisors of the coordinator)
        vals = snapshot.val();

        // For each advisor in the new list
        for (var advId in vals) {
            getAdvisors2(advId);
        }
    });
}

function getAdvisors2(advId) {

    // Connect to the advisors data
    firebase.database().ref("advisors/" + advId).once('value', function (snapshot2) {

        // Gets the snapshot of the data (current advisor's data)
        advisorVals = snapshot2.val();

        var advisor = {};
        for (var key in advisorVals)
            advisor[key] = advisorVals[key];

        getAdvisors3(advisor, advId, snapshot2.key);
    });
}

function getAdvisors3(advisor, adv, id) {

    // Get the number of students for advisor 'adv'
    firebase.database().ref("advisorStudent/" + adv).once('value', function (snapshot3) {
        terms = snapshot3.val();

        var count = 0;
        for (var term in terms)
            for (var student in terms[term])
                count += Object.keys(terms[term][student]).length;

        advisor.students = count;
        advisor.id = id;
        advisor.email = id.split(" ").join(".");
        
        // Add to the list of advisors
        advisors.push(advisor);
    });
}

function exportCurrentView() {
    $("thead .material-icons.icon").remove();
    $(".datatable__progress").remove();

    e1 = exportTable2("List of advisors");
    e1.reset();
    document.getElementsByClassName("button-default xls")[0].click();
}

app_remove_advisors = {
    template: app_remove_advisors_template,
    data() {
        return {
            advisors: advisors,
            headers: headers,
            search: '',
        }
    }
};

Vue.component('app-remove-advisors', app_remove_advisors);