app_remove_advisors_template = `
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
            <td> <button class="btn btn-danger" style="padding:0px 5px;" @click="remAdv(advisor.id)">X</button> </td>
        </tr>
    </tbody>
</table>
`;
headers = ["Name", "Numbr of students", "Remove"];

function remAdv(adv) {

    // Remove from advisors list
    firebase.database().ref('advisors/' + adv).remove();

    // Remove from coordinator's list
    firebase.database().ref('coordinators/' + coordinator + '/advisors/' + adv).remove();

    //temp // Disables account -> remove account
    write2DB('users/' + adv, { type: "disabled" });

    //TODO // Removes account
    // removeUser()
    
}

var advisors = [];
var coordinator;
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
    firebase.database().ref("coordinators/" + coordinator + "/advisors").on('value', function (snapshot) {
        // Clears the old list
        while (advisors.length > 0)
            advisors.pop();

        // Gets the snapshot of the data (advisors of the coordinator)
        vals = snapshot.val();

        // For each advisor in the new list
        for (advId in vals) {

            // Connect to the advisors data
            firebase.database().ref("advisors/" + advId).on('value', function (snapshot2) {

                // Gets the snapshot of the data (current advisor's data)
                advisorVals = snapshot2.val();

                var advisor = {};
                for (var key in advisorVals) {
                    advisor[key] = advisorVals[key];
                }

                //temp //TBD
                advisor["students"] = "TBD";
                advisor["id"] = snapshot2.key;

                // Add to the list of advisors
                advisors.push(advisor);
            });
        }
    });
}

app_remove_advisors = {
    template: app_remove_advisors_template,
    data() {
        return {
            advisors: advisors
        }
    }
};

Vue.component('app-remove-advisors', app_remove_advisors);