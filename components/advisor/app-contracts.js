app_contracts_table_template = `
<table class="table table-bordered">
    <thead>
        <tr>
            <th v-for="header in headers">{{ header }}</th>
        </tr>
    </thead>
    <tbody v-if="contracts.length!=0">

        <template v-for="(contract,index) in contracts">

            <tr v-if="contract" data-toggle="collapse" data-parent="#accordion" :href="'#'+contract.name">
                <td> {{ contract.name }} </td>
                <td> {{ contract.company }} </td>
                <td> {{ contract.supervisor }} </td>
            </tr>
            
            <tr>
                <div v-if="contract.company" :id="contract.name" class="panel-collapse collapse">
                    <div class="panel-body">
                        
                        <p>Type: {{ contract.type }}</p>
                        <p>Country: {{ contract.country }}</p>
                        <p>City: {{ contract.city }}</p>
                        <p>Location: {{ contract.location }}</p>
                        <a> More details</a>
                        
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

setTimeout(function () {

    // Gets the advisor identifier (email)
    advisor = firebase.auth().currentUser.email.split(".").join(" ");//or coordinator
    
    firebase.database().ref("users/" + advisor).once('value', function (snapshot0) {

        path = "advisors/";
        if (snapshot0.val().type == "Coordinator") {
            path = "coordinators/";
        }

        // Connects to the advisor's/coordinator's students
        firebase.database().ref(path + advisor + "/students").once('value', function (snapshot) {

            // Clears the old list
            while (students.length > 0)
                students.pop();

            // Gets the snapshot of the data (students of the advisors)
            vals = snapshot.val();

            // For each student in the new list
            for (var stu in vals) {

                // Connect to get the student's data
                firebase.database().ref("students/" + stu).once('value', function (snapshot2) {

                    // Gets the snapshot of the data (current student's data)
                    studentVals = snapshot2.val();

                    var student = {};
                    for (var key in studentVals) {
                        student[key] = studentVals[key];
                    }

                    // Trying to get the student's supervisor's data
                    try {
                        firebase.database().ref("supervisors/" + student.supervisor.split(".").join(" ")).once('value', function (snapshot4) {
                            supVals = snapshot4.val();
                            student.supervisor = supVals.name;
                        });
                    } catch (err) {
                        console.log(err.name);
                    }

                    // Highlight not submitting the contract yet
                    if (student.name == undefined) {
                        student.name = snapshot2.key;
                        student.supervisor = "<No contract>";
                    }
                    // Add to the list of students
                    students.push(student);
                });
            }
        });
    });
}, 1250);

app_contracts_table = {
    template: app_contracts_table_template,
    data() {
        return {
            contracts: students
        }
    }
};

Vue.component('app-contracts-table', app_contracts_table);