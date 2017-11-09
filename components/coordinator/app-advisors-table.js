app_advisors_table_template = `
<table class="table table-bordered table-striped table-hover">
    <thead>
        <tr>
            <th v-for="header in headers">{{ header }}</th>
        </tr>
    </thead>
    <tbody>
        <tr v-for="advisor in advisors">
            <td> {{ advisor.name }} </td>
            <td> {{ advisor.students }} </td>
        </tr>
    </tbody>
</table>
`;

headers = ["Name", "Numbr of students"];

var advisors = [];

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        console.log("updating view")
        updateView();
    }
});

function updateView() {

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
        for (var adv in vals) {

            // Connect to the advisors data
            firebase.database().ref("advisors/" + adv).once('value', function (snapshot2) {

                // Gets the snapshot of the data (current advisor's data)
                advisorVals = snapshot2.val();
                var advisor = {};
                for (var key in advisorVals) {
                    advisor[key] = advisorVals[key];
                }

                //temp //TBD
                advisor["students"] = "TBD";

                // Add to the list of advisors
                advisors.push(advisor);
            });
        }
    });
}

app_advisors_table = {
    template: app_advisors_table_template,
    data() {
        return {
            advisors: advisors
        }
    }
};

Vue.component('app-advisors-table', app_advisors_table);