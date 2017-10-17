app_dashboard_template = `
<div class="container">
    <div class="panel panel-primary">
        <div class="panel-heading">{{title}}</div>
            <div class="panel-body">
                <slot></slot>
            </div>
        </div>
    </div>
</div>
`
app_dashboard = {
    template: app_dashboard_template,
    props: {
        title: String
    }
};

Vue.component('app-dashboard', app_dashboard);