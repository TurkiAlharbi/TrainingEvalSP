app_dashboard_no_container_template = `
<v-container>
    <v-card class="blue white--text" style="border: 1px solid #2196f3">

        <v-card-title primary-title class="justify-center ma-0 pa-2">
            <v-layout justify-center style="font-size:1.2em">
                {{title}}
            </v-layout>
        </v-card-title>

        
        <v-card-text class="white">
            <v-layout row wrap justify-center>
                <slot></slot>
            </v-layout>
        </v-card-text>

    </v-card>
</v-container>
`;

app_dashboard_no_container = {
    template: app_dashboard_no_container_template,
    props: {
        title: String,
    }
};

Vue.component('app-dashboard-no-container', app_dashboard_no_container);