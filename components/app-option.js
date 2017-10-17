app_option_template = `
<div class="col-xs-12 col-sm-6 col-md-4 col-lg-3">
    <div class="card">
        <div class="thumbnail">
            <div class="caption" style="text-align:center">
                <hr style="width:50%;margin:15px auto">
                <a :href="link">{{name}}</a>
                <hr style="width:50%;margin:15px auto">
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