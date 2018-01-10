template = `
<div>
    <v-layout wrap>
        <v-flex xs12>
            <v-select label="Periods" v-bind:items="periods" v-model="period" required></v-select>
        </v-flex>
        <v-flex xs12 class="text-xs-center">
            <v-btn @click="archive" class="green white--text">Archive</v-btn>
        </v-flex>
        <v-flex xs12>
            <v-select label="Archived periods" v-bind:items="periods2" v-model="period2" required></v-select>
        </v-flex>
        <v-flex xs12 class="text-xs-center">
            <v-btn @click="unarchive" class="green white--text">Un-archive</v-btn>
        </v-flex>
    </v-layout>
</div>
`;

var periods = [];
var periods2 = [];

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        console.log("updating view")
        updateView();
    }
});

function updateView() {

    coordinator = firebase.auth().currentUser.email.split(".").join(" ");

    firebase.database().ref("coordinators/" + coordinator + "/terms").on('value', function (snapshot) {

        while (periods.length > 0)
            periods.pop();

        vals = snapshot.val();

        for (var i in vals)
            periods.push(i);
    });

    firebase.database().ref("archived/coordinators/" + coordinator + "/terms").on('value', function (snapshot) {

        while (periods2.length > 0)
            periods2.pop();

        vals = snapshot.val();

        for (var i in vals)
            periods2.push(i);
    });

}

Vue.component("app-archive", {
    template: template,
    data() {
        return {
            periods: periods,
            period: '',
            periods2: periods2,
            period2: '',
        }
    },
    methods: {
        archive: function () {
            if (this.periods.indexOf(this.period) != -1) {
                vm = this;
                coordinator = firebase.auth().currentUser.email.split(".").join(" ");
                this.archive2("coordinators/" + coordinator + "/terms/" + this.period);
                this.archive2("coordinatorStudent/" + coordinator + "/" + this.period);
                this.archive2("advisorStudent/" + coordinator + "/" + this.period);
                firebase.database().ref("coordinators/" + coordinator + "/advisors").once('value', function (snapshot) {
                    vals = snapshot.val();
                    for (i in Object.keys(vals)) {
                        advisor = Object.keys(vals)[i].split(".").join(" ")
                        vm.archive2("advisorStudent/" + advisor + "/" + vm.period);
                    }
                });
            }
        },
        archive2: function (path) {
            moveRecord(path, "archived/" + path);
        },
        unarchive: function () {
            if (this.periods2.indexOf(this.period2) != -1) {
                vm = this;
                coordinator = firebase.auth().currentUser.email.split(".").join(" ");
                this.unarchive2("coordinators/" + coordinator + "/terms/" + this.period2);
                this.unarchive2("coordinatorStudent/" + coordinator + "/" + this.period2);
                this.unarchive2("advisorStudent/" + coordinator + "/" + this.period2);
                firebase.database().ref("coordinators/" + coordinator + "/advisors").once('value', function (snapshot) {
                    vals = snapshot.val();
                    for (i in Object.keys(vals)) {
                        advisor = Object.keys(vals)[i].split(".").join(" ")
                        vm.unarchive2("advisorStudent/" + advisor + "/" + vm.period2);
                    }
                });
            }
        },
        unarchive2: function (path) {
            moveRecord("archived/" + path, path);
        },
    }
});

