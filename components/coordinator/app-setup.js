app_setup_template = `
<div>
    <v-tabs centered grow>
        <v-tabs-bar class="blue" dark>
            <v-tabs-slider class="yellow"></v-tabs-slider>
            <v-tabs-item href="#new">Create a new form</v-tabs-item>
            <v-tabs-item href="#modify" disabled>Modify a draft</v-tabs-item>
        </v-tabs-bar>

        <v-tabs-items>
            <v-tabs-content id="new">
                <v-card flat>
                    <v-card-text>
                        <app-setup-new></app-setup-new>
                    </v-card-text>
                </v-card>
            </v-tabs-content>
            <v-tabs-content id="modify">
                <v-card flat>
                    <v-card-text>
                        <app-setup-modify></app-setup-modify>
                    </v-card-text>
                </v-card>
            </v-tabs-content>
        </v-tabs-items>

    </v-tabs>
</div>
`;

app_setup = {
    template: app_setup_template,
};

Vue.component('app-setup', app_setup);