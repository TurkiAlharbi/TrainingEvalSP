app_page_header_template = `
<div>
    <v-container>
        <a href="../">
            <v-btn style="background-color:rgb(250, 186, 59);color:#fff"><v-icon left>arrow_back</v-icon>Return to dashboard</v-btn>
        </a>
    </v-container>
</div>
`
link = window.location.search;
app_page_header = {
    template: app_page_header_template,
};

Vue.component('app-page-header', app_page_header);