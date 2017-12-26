app_marks_template = `
<div>
    <v-layout row wrap>
        <v-flex xs12>
            <v-select label="Period" v-bind:items="periods" v-model="period" item-text="name" required></v-select>
        </v-flex>

        <v-flex xs12>
            <v-layout justify-center>
                <v-btn class="green white--text" @click="if(viewPeriod(period)){view = true;shownPeriod = period}">View period
                    <v-icon dark right>format_list_numbered</v-icon>
                </v-btn>
            </v-layout>
        </v-flex>
    <v-layout>
    <v-flex xs12>
        <div v-if="view">
            <v-container>
                <template v-for="form in shownPeriod.forms">
                    <v-layout row wrap>
                        <v-flex xs8>
                            <p>{{ form.form.title }}</p>
                        </v-flex>
                        <v-flex xs4>
                            <v-text-field label="weight" v-model="form.weight"></v-text-field>
                        </v-flex>
                    </v-layout>
                </template>
            </v-container>

            <v-text-field append-icon="search" label="Search" v-model="search"></v-text-field>
            
            <v-data-table v-bind:headers="headers.concat(shownPeriod.formHeaders)" :items="shownPeriod.students" v-bind:search="search" item-key="name" hide-actions class="elevation-1">
                <template slot="items" slot-scope="props">
                    <td class="text-xs-center ma-0 pa-0">{{ props.item.id }}</td>
                    <td class="text-xs-center ma-0 pa-0">{{ props.item.name }}</td>
                    <td class="text-xs-center ma-0 pa-0" v-if="shownPeriod.forms" v-for="f in shownPeriod.forms">
                        <template v-for="(form,index) in props.item.forms" v-if="Object.keys(form)[0] == f.name">
                            {{ (form[f.name].score /  form[f.name].outOf * shownPeriod.forms[index].weight).toFixed(1) }}
                        </template>
                    </td>
                </template>
            </v-data-table>
            <br/>
            <v-layout justify-center>
                <v-btn class="green white--text" @click="exportCurrentView">Save current view as xls</v-btn>
            </v-layout>
        </div>
    </v-flex>
</div>
`;

var headers = [
    { text: 'ID', value: 'id', align: "center" },
    { text: 'Name', value: 'name', align: "center" },
];

var view = false;
var periods = [];

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        console.log("updating view")
        updateView();
    }
});

function updateView() {

    // Gets email (identifier)
    coordinator = firebase.auth().currentUser.email.split(".").join(" ");

    // Connects to the evaluations
    firebase.database().ref("evaluation forms/" + coordinator).once('value', function (snapshot3) {
        coordinatorForms = snapshot3.val();
        var index = 0;
        for (var form_meta in coordinatorForms) {
            terms = form_meta.split("__")[0].split("_").join(" ");
            type = form_meta.split("__")[1];
            periodName = type + " (" + terms + ")";

            addPeriod(periodName);
            addFormToPeriod(periodName, form_meta, coordinatorForms[form_meta]);
        }
    });
}

function addPeriod(period) {
    for (i in periods)
        if (period == periods[i].name)
            return;
    periods.push({ name: period, forms: [], formHeaders: [], students: [], studentIDs: [], fetched: false });
}

function addFormToPeriod(period, formName, form) {
    for (i in periods)
        if (period == periods[i].name) {
            periods[i].forms.push({ name: formName, form: form, weight: 25 });
            periods[i].formHeaders.push({ text: form.title, value: formName, align: "center" });
            return;
        }
}

function viewPeriod(period) {
    if (period) {
        if (!period.fetched) {
            for (i in period.forms)
                fetchEval(period, period.forms[i])
            period.fetched = true;
        }
        return true;
    }
    return false;
}

function exportCurrentView() {
    $("thead .material-icons.icon").remove();
    $(".datatable__progress").remove();

    e1 = exportTable2("Marks report");
    e1.reset();
    document.getElementsByClassName("button-default xls")[0].click();
}

function fetchEval(period, form) {
    firebase.database().ref("evaluation/" + coordinator + "/" + form.name).once('value', function (snapshot) {
        vals = snapshot.val();
        if (vals != null) {
            for (student in vals) {
                addStudentToPeriod(period, form, vals, student);
            }
        }
    });
}

function addStudentToPeriod(period, form, formVals, sid) {
    var questions = form.form.questions;
    var totalWeight = 0;
    var totalScore = 0;
    var index = period.studentIDs.indexOf(sid);
    if (index == -1) {
        period.studentIDs.push(sid);
        period.students.push({ id: sid, name: "", forms: [] });
        index = period.studentIDs.indexOf(sid);
        resolveName(period, index, sid);
    }

    for (i in questions) {
        questions[i].weight = parseFloat(questions[i].weight);
        totalWeight += questions[i].weight;
        totalScore += formVals[sid].questions[i] * questions[i].weight / 10;
    }

    period.students[index].forms.push({ [form.name]: { score: totalScore, outOf: totalWeight } });
}

function resolveName(period, index, student) {
    firebase.database().ref("students/" + student + "/name").once('value', function (snapshot3) {
        try {
            period.students[index].name = snapshot3.val();
        } catch (err) {
            console.log(err.name);
        }
    });
}

app_marks = {
    template: app_marks_template,
    data() {
        return {
            view: view,
            search: '',
            periods: periods,
            period: '',
            shownPeriod: '',
        };
    }
};

Vue.component('app-marks', app_marks);