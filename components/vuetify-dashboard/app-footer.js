app_footer_template = `
<v-footer class="blue white--text pb-3 pt-2" fixed>
    
    <v-spacer></v-spacer>
    <div>EvaluateMe © {{ new Date().getFullYear() }}</div>
    <v-spacer></v-spacer>

</v-footer>
`;

app_footer = {
    template: app_footer_template,
    props: {
        title: String,
    }
};

Vue.component('app-footer', app_footer);