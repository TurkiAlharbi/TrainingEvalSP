app_option_template = `
<div class="col-xs-12 col-sm-6 col-md-4 col-lg-3">
    <div class="card">
        <div class="thumbnail">
            <div class="caption">
                <hr style="width:60%">
                <hr style="width:80%">
                <a :href="link">{{name}}</a>
                <hr style="width:60%">
                <hr style="width:40%">
            </div>
        </div>
    </div>
</div>
`
app_option = {
    template: app_option_template,
    props: {
        name: String,
        link: String,
    }
};

Vue.component('app-option', app_option);