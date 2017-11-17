app_coordinators_table_template = `
<div>
    <v-text-field append-icon="search" label="Search" v-model="search"></v-text-field>

    <v-data-table v-bind:headers="headers" :items="coordinators" v-bind:search="search" hide-actions class="elevation-1">
        <template slot="items" slot-scope="props">
            <td class="text-xs-center">{{ props.item.name }}</td>
            <td class="text-xs-center">{{ props.item.email }}</td>
            <td class="text-xs-center">{{ props.item.majors }}</td>
            <td class="text-xs-center"><v-btn color="red" flat icon @click="remCoord(props.item.key)">
                <v-icon>cancel</v-icon>
            </v-btn></td>
        </template>
    </v-data-table>
</div>
`;

var coordRef = firebase.database().ref('coordinators/');
var coordinators = [];
var headers = [
    { text: 'Name', value: 'name', align: "center" },
    { text: 'Email', value: 'email', align: "center", sortable: false },
    { text: 'Majors', value: 'majors', align: "center", sortable: false },
    { text: 'Remove', align: "center", sortable: false },
];

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        console.log("updating view")
        updateView();
    }
});

function updateView() {
    coordRef.on('value', function (snapshot) {
        while (coordinators.length > 0)
            coordinators.pop();

        vals = snapshot.val();

        for (var key in vals) {
            var coord = vals[key];
            coord.email = key.split(" ").join(".");
            coord.majors = vals[key].majors.sort().join(", ");
            coord.key = key;

            coordinators.push(coord);
        }
    })
}

function remCoord(coordKey) {

    // Remove from coordinators list
    firebase.database().ref('coordinators/' + coordKey).remove();

    //temp // Disables account -> remove account
    write2DB('users/' + coordKey, { type: "disabled" });

    //TODO // Removes account
    // removeUser()
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