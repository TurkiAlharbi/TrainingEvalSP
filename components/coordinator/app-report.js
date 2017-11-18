template = `
<div>
    <v-data-table v-bind:headers="headers.concat(majors)" :items="periods" hide-actions class="elevation-1">
        <template slot="items" slot-scope="props">
            <td class="text-xs-center">{{ props.item.period }}</td>
            <template v-for="major in majors">
                <td class="text-xs-center" v-if="props.item.majors[major.text] != null">{{ Object.keys(props.item.majors[major.text]).length }}</td>
                <td class="text-xs-center" v-else>0</td>
            </template>
        </template>
    </v-data-table>
</div>
`;

var periods = [];
var majors = [];
var majors2 = [];
var headers = [
    { text: 'Period', value: 'period', align: "center" },
];

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        console.log("updating view")
        updateView();
    }
});

function updateView() {

    // Gets email (identifier)
    coordinator = firebase.auth().currentUser.email.split(".").join(" ");

    // Clears the old list
    while (periods.length > 0)
        periods.pop();

    while (majors.length > 0)
        majors.pop();


    firebase.database().ref("coordinatorStudent/" + coordinator).once('value', function (snapshot) {

        vals = snapshot.val();
        for (var i in vals) {
            var newMajors = Object.keys(vals[i]);
            for (var m in newMajors) {
                if (majors2.indexOf(newMajors[m]) == -1) {
                    majors2.push(newMajors[m]);
                    majors.push({ text: newMajors[m], align: "center", sortable: false });
                }
            }

            periods.push({ period: i, majors: vals[i] });
        }
    });
}

app_report = {
    template: template,
    data() {
        return {
            periods: periods,
            majors: majors,
        };
    }
}

Vue.component("app-report", app_report);