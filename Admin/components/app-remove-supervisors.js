template = `
<div>
    <v-layout row wrap>
        <v-flex class="text-xs-center">
            <template v-if="msg=='Done'">
                <div>Done removing <span v-if="count<2">a</span><span v-else>{{ count }}</span> supervisor<span v-if="count>=2">s</span></div>
            </template>
            <template v-if="msg=='No'">
                <div>There is no obsolete supervisor</div>
            </template>
            <v-btn color="green" class="white--text" @click="remove">Remove Supervisors inactive for 1 year</v-btn>
        </v-flex>
    </v-layout>
</div>
`;

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        console.log("updating view")
    }
});

Vue.component('app-remove-supervisors', {
    template: template,
    data() {
        return {
            msg: '',
            count: 0
        };
    },
    methods: {
        remove: function () {
            vm = this;
            vm.count = 0;
            vm.msg = "";
            firebase.database().ref('supervisors/').once('value', function (snapshot) {
                vals = snapshot.val();

                for (var i in vals) {
                    var supervisor = vals[i];

                    var lastActivity = supervisor.lastActivity;
                    if (lastActivity == null)
                        lastActivity = "2000 1 2";

                    var date = new Date();
                    var deleteUpTo = (date.getFullYear() - 1) + " " + (date.getMonth() + 1) + " " + date.getDate();
                    var deleteDate = Date.parse(deleteUpTo);
                    var lastActivityDate = Date.parse(lastActivity);

                    if (deleteDate > lastActivityDate) {
                        console.log("Deleting!");
                        vm.removeSupervisor(i);
                    } else {
                        console.log("Save!");
                    }
                }
            }).then(function () {
                if (vm.count != 0)
                    vm.msg = "Done";
                else
                    vm.msg = "No";
            })
        },
        removeSupervisor: function (supervisor) {
            write2DB("supervisors" + "/" + supervisor, null);
            this.count++;
        }
    },
});

