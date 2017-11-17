app_availability_evaluations_template = `
<div>
    <v-text-field append-icon="search" label="Search" v-model="search"></v-text-field>
    
    <v-data-table v-bind:headers="headers" :items="evaluations" v-bind:search="search" hide-actions class="elevation-1">
        <template slot="items" slot-scope="props">
            <tr @click="props.expanded = !props.expanded" :class="{'blue--text':props.item.contract}">
                <td class="text-xs-center">{{ props.item.title }}</td>
                <td class="text-xs-center">{{ props.item.terms }}</td>
                <td class="text-xs-center">{{ props.item.status }}</td>
                <td class="text-xs-center">
                    <template v-if="props.item.status != 'Drafted'">
                        {{ props.item.numOfEvals }}
                    </template>
                    <template v-else>
                        -
                    </template>
                </td>
                <td class="text-xs-center">
                    <template v-if="props.item.status == 'Opened'">
                        <span v-if="props.item.autoClose>1">{{props.item.autoClose}}</span><span v-else>1</span> day<span v-if="props.item.autoClose>1">s</span>
                    </template>
                    <template v-else>
                        -
                    </template>
                </td>
                <td class="text-xs-center">
                    <v-btn v-if="props.item.status == 'Drafted'" class="cyan  white--text" @click="open(coordinator+'/'+props.item.id)">
                        Save & Open
                        <v-icon dark right>library_books</v-icon>
                    </v-btn>
                    <v-btn v-if="props.item.status == 'Closed'" class="green white--text" @click="open(coordinator+'/'+props.item.id)">
                        Open
                        <v-icon dark right>lock_open</v-icon>
                    </v-btn>
                    
                    <v-btn v-if="props.item.status == 'Opened'" class="red white--text" @click="close(coordinator+'/'+props.item.id)">
                        Close now
                        <v-icon dark right>lock</v-icon>
                    </v-btn>
                </td>
            </tr>
        </template>
    </v-data-table>
</div>
`;

var headers = [
    { text: 'Title', value: 'title', align: "center" },
    { text: 'Period', value: 'terms', align: "center" },
    { text: 'Status', value: 'status', align: "center" },
    { text: 'Number of evaluations', value: 'numOfEvals', align: "center" },
    { text: 'Close in', value: 'autoClose', align: "center" },
    { text: 'Action', value: 'action', align: "center", sortable: false },
];

evaluations = [""];

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        console.log("updating view")
        updateView();
    }
});

function updateView() {

    // Gets the cooridnator identifier (email)
    coordinator = firebase.auth().currentUser.email.split(".").join(" ");

    // Connects to get the coordinator forms
    firebase.database().ref("evaluation forms/" + coordinator).once('value', function (snapshot) {

        // Clears the old list
        while (evaluations.length > 0)
            evaluations.pop();

        // Gets the snapshot of the data (evaluations of the coordinator)
        vals = snapshot.val();

        // For each evaluation in the new list
        for (var eva in vals) {
            getEval(vals, eva, coordinator)
        }
    });
}

function getEval(vals, eva, coordinator) {
    var evaluation = vals[eva];
    evaluation.id = eva;
    evaluation.hash = "#" + eva;
    firebase.database().ref("evaluation/" + coordinator + "/" + eva).once('value', function (snapshot2) {

        try {
            evaluation.numOfEvals = Object.keys(snapshot2.val()).length;
        } catch (err) {
            evaluation.numOfEvals = 0;
        }

        evaluations.push(evaluation);
    });
}

function open(evaluation) {
    update2DB('evaluation forms/' + evaluation, { status: "Opened", autoClose: "7" });
}

function close(evaluation) {
    update2DB('evaluation forms/' + evaluation, { status: "Closed" });
}

app_availability_evaluations = {
    template: app_availability_evaluations_template,
    data() {
        return {
            evaluations: evaluations,
            search: ''
        };
    }
};

Vue.component('app-availability-evaluations', app_availability_evaluations);