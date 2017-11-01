app_page_header_template = `
<div>
    <div class="container" v-if="link == '?popup'">
        <br/>
        <br/>
    </div>
    <div class="container" v-else>
        <br/>
        <a href="./">
            <button class="btn btn-warning">Return to dashboard</button>
        </a>
        <hr/>
    </div>
</div>
`
link = window.location.search;
app_page_header = {
    template: app_page_header_template,
};

Vue.component('app-page-header', app_page_header);