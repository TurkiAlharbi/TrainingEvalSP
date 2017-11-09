app_remove_coordinators_template = `
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
            <td> <button class="btn btn-danger" style="padding:0px 5px;" @click="remCoord(coordinator.key)">X</button> </td>
        </tr>
    </tbody>
</table>
`;

headers = ["Name", "Majors", "Numbr of students", "Remove"];

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
            coord = vals[key];
            // coord["email"] = key.split(" ").join(".");
            coord["students"] = "TBD";
            coord["key"] = key;
            coordinators.push(coord);
        }
    });
}
function remCoord(coordKey) {

    // Remove from coordinators list
    firebase.database().ref('coordinators/' + coordKey).remove();

    //temp // Disables account -> remove account
    write2DB('users/' + coordKey, { type: "disabled" });

    //TODO // Removes account
    // removeUser()
}

app_remove_coordinators = {
    template: app_remove_coordinators_template,
    data() {
        return {
            coordinators: coordinators
        }
    }
};

Vue.component('app-remove-coordinators', app_remove_coordinators);