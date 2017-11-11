app_availability_evaluations_template = `
<table class="table table-bordered table-striped">
    <thead>
        <tr>
            <th v-for="header in headers">{{ header }}</th>
        </tr>
    </thead>
    <tbody>

        <template v-for="(eval,index) in evaluations">
        
            <tr data-toggle="collapse" data-parent="#accordion" :href="eval.hash" >
                <td style="color:#428bca;cursor:pointer"> {{ eval.title }} </td>
                <td> {{ eval.terms }} </td>
                <td> {{ eval.status }} </td>
            </tr>
            
            <tr>
                <div :id="eval.id" class="panel-collapse collapse">
                    <div class="panel-body">
                        <p v-if="eval.status != 'Drafted'">Number of evaluations: {{ eval.numOfEvals }}</p>
                        <button class="btn btn-info" v-if="eval.status == 'Drafted'" @click="open(coordinator+'/'+eval.id)">Save & Open</button>
                        <button class="btn btn-success"  v-if="eval.status == 'Closed'" @click="open(coordinator+'/'+eval.id)">Open</button>
                        <p v-if="eval.status =='Opened'">Will be closed in {{eval.autoClose}} day(s)</p>
                        <button class="btn btn-danger" v-if="eval.status == 'Opened'" @click="close(coordinator+'/'+eval.id)">Close now</button>
                    </div>
                </div>
            </tr>
        </template>
    </tbody>
</table>
`;

headers = ["Title", "Period", "Status"];

evaluations = [""];

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

        // For each evaluation in the new list
        for (var eva in vals) {
            getEval(vals, eva, coordinator)
        }
    });
}

function getEval(vals, eva, coordinator) {
    var evaluation = vals[eva];
    evaluation.id = eva;
    evaluation.hash = "#" + eva;
    firebase.database().ref("evaluation/" + coordinator + "/" + eva).once('value', function (snapshot2) {

        try {
            evaluation.numOfEvals = Object.keys(snapshot2.val()).length;
        } catch (err) {
            evaluation.numOfEvals = 0;
        }

        evaluations.push(evaluation);
    });
}

function open(evaluation) {
    update2DB('evaluation forms/' + evaluation, { status: "Opened", autoClose: "7" });
}

function close(evaluation) {
    update2DB('evaluation forms/' + evaluation, { status: "Closed" });
}

app_availability_evaluations = {
    template: app_availability_evaluations_template,
    data() {
        return {
            evaluations: evaluations
        }
    }
};

Vue.component('app-availability-evaluations', app_availability_evaluations);