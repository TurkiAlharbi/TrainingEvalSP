template = `
<div>
    <v-text-field append-icon="search" label="Search" v-model="search"></v-text-field>

    <v-data-table v-bind:headers="headers" :items="coordinators" v-bind:search="search" hide-actions class="elevation-1">
        <template slot="items" slot-scope="props">
            <td class="text-xs-center">{{ props.item.name }}</td>
            <td class="text-xs-center">{{ props.item.email }}</td>
            <td class="text-xs-center"><v-btn color="green" flat icon @click="activateCoord(props.item.key)">
                <v-icon>check</v-icon>
            </v-btn></td>
        </template>
    </v-data-table>
</div>
`;

var coordinators = [];
var headers = [
    { text: 'Name', value: 'name', align: "center" },
    { text: 'Email', value: 'email', align: "center", sortable: false },
    { text: 'Activate', align: "center", sortable: false },
];

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        console.log("updating view")
        updateView();
    }
});

function updateView() {
    firebase.database().ref('inactive/coordinators/').on('value', function (snapshot) {
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

function activateCoord(coordKey) {

    // activate coordinator
    moveRecord('inactive/coordinators/' + coordKey, 'coordinators/' + coordKey);
    write2DB('users/' + coordKey, { type: "Coordinator" });
}

app_activate_coord = {
    template: template,
    data() {
        return {
            coordinators: coordinators,
            headers: headers,
            search: '',
        };
    }
};

Vue.component('app-activate-coord', app_activate_coord);