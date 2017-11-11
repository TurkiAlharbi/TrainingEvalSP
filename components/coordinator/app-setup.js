app_setup_template = `
<div>
    <ul class="nav nav-pills nav-justified">
        <li class="active">
            <a data-toggle="pill" href="#new">Create a new form</a>
        </li>
        <!--
        <li>
            <a data-toggle="pill" href="#modify">Modify a draft</a>
        </li>
        -->
    </ul>

    <div class="tab-content">
        <div id="new" class="tab-pane fade in active">
            <app-setup-new></app-setup-new>
        </div>

        <!--
        <div id="modify" class="tab-pane fade">
            <app-setup-modify></app-setup-modify>
        </div>
        -->
    </div>
</div>
`;

app_setup = {
    template: app_setup_template,
};

Vue.component('app-setup', app_setup);