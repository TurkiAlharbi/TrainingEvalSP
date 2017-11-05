app_dashboard_no_container_template = `
<div style="text-align: center;">
    <div class="panel panel-primary">
        <div class="panel-heading">{{title}}</div>
            <div class="panel-body">
                <slot></slot>
            </div>
        </div>
    </div>
</div>
`
app_dashboard_no_container = {
    template: app_dashboard_no_container_template,
    props: {
        title: String,
    }
};

Vue.component('app-dashboard-no-container', app_dashboard_no_container);