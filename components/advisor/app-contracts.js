app_contracts_table_template = `
<table class="table table-bordered">
    <thead>
        <tr>
            <th v-for="header in headers">{{ header }}</th>
        </tr>
    </thead>
    <tbody v-if="contracts.length!=0">

        <template v-for="(contract,index) in contracts">

            <tr v-if="contract" data-toggle="collapse" data-parent="#accordion" :href="'#'+contract.id">
                <td v-if="contract.company == null"> {{ contract.name }} </td>
                <td v-else style="color:#428bca;cursor:pointer"> {{ contract.name }} </td>
                <td> {{ contract.company }} </td>
                <td> {{ contract.supervisor }} </td>
            </tr>
            
            <tr>
                <div v-if="contract.company != null" :id="contract.id" class="panel-collapse collapse">
                    <div class="panel-body">
                        <span v-for="(thing,i) in contract.contract">
                        <p v-if="thing!=''">{{i}} : {{thing}}</p>
                        </span>
                    </div>
                </div>
            </tr>

            <tr>
            
            </tr>
            
        </template>

    </tbody>
</table>


`;

// headers = ["Student Name", "Type", "Company"];
headers = ["Student Name", "Company", "Supervisor"];

var students = [];

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        console.log("updating view")
        updateView();
    }
});

function updateView() {

    // Gets email (identifier)
    advisor = firebase.auth().currentUser.email.split(".").join(" ");

    // Connects to the coordinator data
    firebase.database().ref("advisorStudent/" + advisor).once('value', function (snapshot) {

        // Clears the old list
        while (students.length > 0)
            students.pop();

        // Gets the snapshot of the data (students of the coordinator)
        vals = snapshot.val();
        console.log(vals);
        // For each term
        for (var term in vals) {
            // For each major
            for (var major in vals[term]) {
                // For each student 
                for (var stu in vals[term][major]) {
                    fetchStudent(stu, major, term, vals);
                }
            }
        }
    });
}

function fetchStudent(stu, major, term, vals) {

    // Connect to get the student's data
    firebase.database().ref("students/" + stu).once('value', function (snapshot2) {

        // Gets the snapshot of the data (current student's data)
        studentVals = snapshot2.val();

        // Stores the students data
        var student = {
            period: term,
            id: snapshot2.key,
            major: major.toUpperCase(),
            supervisor: vals[term][major][snapshot2.key].supervisor,
        };

        // Get students data
        for (var key in studentVals)
            student[key] = studentVals[key];

        // Trying to get the student's supervisor's data
        try {
            firebase.database().ref("supervisors/" + student.supervisor.split(".").join(" ")).once('value', function (snapshot4) {
                supVals = snapshot4.val();
                student.supervisor = supVals.name;
            });
        } catch (err) {
            console.log(err.name);
        }

        // Trying to get the student's supervisor's data
        try {
            firebase.database().ref("contracts/" + stu).once('value', function (snapshot5) {
                conVals = snapshot5.val();
                student.contract = conVals;
            });
        } catch (err) {
            console.log(err.name);
        }

        // Highlight not submitting the contract yet
        if (student.name == undefined) {
            student.name = stu + " <no contract>";
        }

        // Add to the list of students
        students.push(student);
    });
}


app_contracts_table = {
    template: app_contracts_table_template,
    data() {
        return {
            contracts: students
        }
    }
};

Vue.component('app-contracts-table', app_contracts_table);