template = `
<div>
    <v-text-field append-icon="search" label="Search" v-model="search"></v-text-field>

    <v-data-table v-bind:headers="headers" :items="coordinators" v-bind:search="search" hide-actions item-key="email" class="elevation-1">
        <template slot="items" slot-scope="props">
            <tr @click="props.expanded = !props.expanded">
                <td class="text-xs-center">{{ props.item.name }}</td>
                <td class="text-xs-center">{{ props.item.majors }}</td>
            </tr>
        </template>
        <template slot="expand" slot-scope="props">
            <v-card flat>
                <v-card-text>
                <v-select label="Majors" v-bind:items="majors" v-model="props.item.majorsList" multiple chips required></v-select>
                    <v-btn class="green white--text" @click="saveMajors(props.item.email,props.item.majorsList)">Save
                        <v-icon dark right>check_circle</v-icon>
                    </v-btn>
                </v-card-text>
            </v-card>
        </template>
    </v-data-table>
</div>
`;

var coordRef = firebase.database().ref('coordinators/');
var coordinators = [];
var headers = [
    { text: 'Name', value: 'name', align: "center" },
    { text: 'Majors', value: 'majors', align: "center", sortable: false },
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
            coord.majorsList = vals[key].majors;
            coord.key = key;
            try {
                coord.majors = vals[key].majors.sort().join(", ");
            } catch (err) {
                console.log(err.name);
            }
            coordinators.push(coord);
        }
    });
}

app_change_majors = {
    template: template,
    data() {
        return {
            coordinators: coordinators,
            headers: headers,
            search: '',
            majors: [
                "ICS", "SWE", "COE",

                "ACCT", "AE", "ARC", "ARE", "CE", "CHE", "CHEM",
                "CISE", "CP", "EE", "FIN", "GEOL", "GEOP", "ISE",
                "MATH", "ME", "MGT", "MIS", "MKT", "PHYS", "STAT",
            ],
        };
    }
};

function saveMajors(email, majors) {
    var emailID = email.split(".").join(" ");
    write2DB("coordinators/" + emailID + "/majors", majors);
}

Vue.component('app-change-majors', app_change_majors);