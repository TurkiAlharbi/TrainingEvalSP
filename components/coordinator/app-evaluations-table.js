app_evaluations_table_template = `
<table class="table table-bordered table-striped table-hover">
    <thead>
        <tr>
            <th v-for="header in headers">{{ header }}</th>
        </tr>
    </thead>
    <tbody>
        <tr v-for="evaluation in evaluations">
            <td> {{ evaluation.id }} </td>
            <td> {{ evaluation.title }} </td>
            <td> {{ evaluation.terms }} </td>
            <td> {{ evaluation.status }} </td>
            <td> {{ evaluation.numOfEvals }} </td>
        </tr>
    </tbody>
</table>
`;

headers = ["Id", "Title", "Terms", "Status", "Number of evaluations"];

evaluations = [];

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        console.log("updating view")
        updateView();
    }
});

function updateView() {

    // Gets the cooridnator identifier (email)
    coordinator = firebase.auth().currentUser.email.split(".").join(" ");

    // Connects to get the coordinator forms
    firebase.database().ref("evaluation forms/" + coordinator).once('value', function (snapshot) {

        // Clears the old list
        while (evaluations.length > 0)
            evaluations.pop();

        // Gets the snapshot of the data (evaluations of the coordinator)
        vals = snapshot.val();

        // add every evaluation in the new list
        for (var eva in vals) {
            getEval(vals, eva, coordinator)
        }
    });
}

function getEval(vals, eva, coordinator) {
    evaluation = vals[eva];
    evaluation.id = eva;
    firebase.database().ref("evaluation/" + coordinator + "/" + evaluation.terms + "/" + eva).once('value', function (snapshot2) {
        vals = snapshot2.val();
        evaluation.numOfEvals = Object.keys(vals).length;
        evaluations.push(evaluation);
    });
}

app_evaluations_table = {
    template: app_evaluations_table_template,
    data() {
        return {
            evaluations: evaluations
        }
    }
};

Vue.component('app-evaluations-table', app_evaluations_table);