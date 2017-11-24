app_expandable_template = `
<v-container>
    <v-expansion-panel expand>
        <v-expansion-panel-content class="blue white--text" style="border: 1px solid #2196f3" v-bind:value="expanded">

            <div slot="header" class="blue white--text" style="border:0">
                <v-card-title primary-title class="justify-center ma-0 pa-0">
                    <v-layout justify-center style="font-size:1.2em">
                        {{ title }}
                    </v-layout>
                </v-card-title>
            </div>

            <v-card-text class="white">
                <v-layout row wrap justify-center>
                    <slot></slot>
                </v-layout>
            </v-card-text>

        </v-expansion-panel-content>
    </v-expansion-panel>
</v-container>
`;

app_expandable = {
    template: app_expandable_template,
    props: {
        title: String,
        expanded: Boolean
    }
};

Vue.component('app-expandable', app_expandable);