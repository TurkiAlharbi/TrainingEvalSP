app_coordinators_table_template = `
<div>
    <v-text-field append-icon="search" label="Search" v-model="search"></v-text-field>

    <v-data-table v-bind:headers="headers" :items="coordinators" v-bind:search="search" hide-actions class="elevation-1" id="coords">
        <template slot="items" slot-scope="props">
            <td class="text-xs-center">{{ props.item.name }}</td>
            <td class="text-xs-center">{{ props.item.email }}</td>
            <td class="text-xs-center">{{ props.item.majors }}</td>
            <td class="text-xs-center"><v-btn color="red" flat icon @click="remCoord(props.item.key)">
                <v-icon>cancel</v-icon>
            </v-btn></td>
        </template>
    </v-data-table>
    <v-layout justify-center>
        <v-btn class="green white--text" @click="exportCurrentView">Save current view as xls</v-btn>
    </v-layout>
</div>
`;

var coordinators = [];
var headers = [
    { text: 'Name', value: 'name', align: "center" },
    { text: 'Email', value: 'email', align: "center" },
    { text: 'Majors', value: 'majors', align: "center" },
    { text: 'Remove', align: "center", sortable: false },
];

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        console.log("updating view")
        updateView();
    }
});

function updateView() {
    firebase.database().ref('coordinators/').on('value', function (snapshot) {
        while (coordinators.length > 0)
            coordinators.pop();

        vals = snapshot.val();

        for (var key in vals) {
            var coord = vals[key];
            coord.email = key.split(" ").join(".");
            coord.key = key;
            try {
                coord.majors = vals[key].majors.sort().join(", ");
            } catch (err) {
                console.log(err.name);
            }
            coordinators.push(coord);
        }
    })
}

function remCoord(coordKey) {

    // in-activate coordinator
    moveRecord('coordinators/' + coordKey, 'inactive/coordinators/' + coordKey);
    write2DB('users/' + coordKey, { type: "disabled" });
}

function exportCurrentView() {
    $("thead .material-icons.icon").remove();
    $(".datatable__progress").remove();

    e1 = exportTable2("Coordinators report");
    e1.reset();
    document.getElementsByClassName("button-default xls")[0].click();
}

app_coordinators_table = {
    template: app_coordinators_table_template,
    data() {
        return {
            coordinators: coordinators,
            headers: headers,
            search: '',
        };
    }
};


Vue.component('app-coordinators-table', app_coordinators_table);