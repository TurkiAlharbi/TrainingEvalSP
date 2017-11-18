app_footer_template = `
<div>
    <div class="pt-4 pb-5"></div>
    <v-footer class="blue white--text pb-3 pt-2 mt-5" dense fixed>
        
        <v-spacer></v-spacer>
        <div>EvaluateMe © {{ new Date().getFullYear() }}</div>
        <v-spacer></v-spacer>

    </v-footer>
</div>
`;

app_footer = {
    template: app_footer_template,
    props: {
        title: String,
    }
};

Vue.component('app-footer', app_footer);