app_coordinators_table_template = `
<table class="table table-bordered table-striped table-hover">
    <thead>
        <tr>
            <th v-for="header in headers">{{ header }}</th>
        </tr>
    </thead>
    <tbody>
        <tr v-for="coordinator in coordinators">
            <td> {{ coordinator.name }} </td>
            <td>
                <span v-for="(major, index) in coordinator.majors">
                    <span v-if="index == 0">{{ major }}</span>
                    <span v-else>, {{ major }}</span>
                </span>
            </td>
            <td> {{ coordinator.students }} </td>
        </tr>
    </tbody>
</table>
`;

headers = ["Name", "Majors", "Numbr of students"];

var coordRef = firebase.database().ref('coordinators/');
var coordinators = [];

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
            // coord["email"] = key.split(" ").join(".");
            coord["students"] = "TBD";
            coordinators.push(coord);
        }
    });
}

app_coordinators_table = {
    template: app_coordinators_table_template,
    data() {
        return {
            coordinators: coordinators
        }
    }
};

Vue.component('app-coordinators-table', app_coordinators_table);