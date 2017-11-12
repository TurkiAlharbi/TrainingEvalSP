template = `
<div>
    <div v-for="(period,index) in periods" style="text-align:left">
        <p>{{ periods[periods.length-index-1].period }}</p>
        <ul>
            <li v-for="(major,index) in periods[periods.length-index-1].majors">{{ index }} : {{ Object.keys(major).length }} student<span v-if="Object.keys(major).length != 1">s</span></li>
        </ul>
        <hr v-if="index+1 != periods.length"/>
    </div>
</div>
`;

var periods = [];

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        console.log("updating view")
        updateView();
    }
});

function updateView() {

    // Gets email (identifier)
    advisor = firebase.auth().currentUser.email.split(".").join(" ");

    // Connects to the advisor data
    firebase.database().ref("advisorStudent/" + advisor).once('value', function (snapshot) {

        // Clears the old list
        while (periods.length > 0)
            periods.pop();

        // Gets the snapshot of the data (periods of the advisor)
        vals = snapshot.val();
        for (var i in vals) {
            periods.push({ period: i, majors: vals[i] });
        }
    });

}

app_report = {
    template: template,
    data() {
        return {
            periods: periods
        }
    }
}

Vue.component("app-report", app_report);