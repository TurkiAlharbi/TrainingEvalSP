template = `
<div>
    <v-data-table v-bind:headers="headers.concat(majors).concat(totalHeader)" :items="periods" hide-actions class="elevation-1" v-if="periods[0]">
        <template slot="items" slot-scope="props">
            <td class="text-xs-center">{{ props.item.period }}</td>
            <template v-for="major in majors">
                <td class="text-xs-center" v-if="props.item.majors[major.text] != null">{{ Object.keys(props.item.majors[major.text]).length }}</td>
                <td class="text-xs-center" v-else>0</td>
            </template>
            <td class="text-xs-center">{{ props.item.total }}</td>
        </template>
        <template slot="footer">
            <td class="text-xs-center">Total</td>
            <template v-for="major in majors">
                <td class="text-xs-center">{{ major.total }}</td>
            </template>
            <td class="text-xs-center">{{ totalTotal }}</td>
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

var totalHeader = [
    { text: 'Total', value: 'total', align: "center", sortable: false },
];
var totalTotal = 0;

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
            var total = 0;
            for (var m in newMajors) {
                var count = Object.keys(vals[i][newMajors[m]]).length;
                total += count;
                if (majors2.indexOf(newMajors[m]) == -1) {
                    majors2.push(newMajors[m]);
                    majors.push({ text: newMajors[m], align: "center", sortable: false, total: count });
                }
                else {
                    majors[majors2.indexOf(newMajors[m])].total += count;
                }
            }
            totalTotal += total;
            periods.push({ period: i, majors: vals[i], total: total });
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