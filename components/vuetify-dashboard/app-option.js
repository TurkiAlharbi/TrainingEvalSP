app_option_template = `
<v-flex xs12 sm6 md4 lg3>
    <v-card class="ma-2">
        <v-card-title class="justify-center" style="border:1px solid #2196f3" v-if="!wip">
            <div class="caption mb-2 mt-2">
                <template>
                    <a :href="link" class="small" style="text-decoration: none">{{name}}</a>
                </template>
            </div>
        </v-card-title>

        <v-card-title v-else class="justify-center" style="border:1px solid #2196f3 ;background-color:#eee">
            <div class="caption mb-2 mt-2">
                <span>Coming up in next sprint(s)</span>
            </div>
        </v-card-title>
    </v-card>
</v-flex>
`
app_option = {
    template: app_option_template,
    props: {
        name: String,
        link: String,
        popup: Boolean,
        done: Boolean,
        wip: Boolean
    },
};

Vue.component('app-option', app_option);