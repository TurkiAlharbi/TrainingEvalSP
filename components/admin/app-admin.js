template = `
<div>
    <app-header name="Admin"></app-header>

    <app-dashboard title="Coordinators management">
        <app-option name="View coordinators" link="./viewCoordinators.html"></app-option>
        <app-option name="Add a coordinator" link="./addCoordinator.html"></app-option>
        <app-option name="Remove a coordinator" link="./removeCoordinators.html"></app-option>
    </app-dashboard>

    <app-dashboard title="Other utilities">
        <app-option name="Generate a report" link="./generateReport.html"></app-option>
        <!--<app-option name="Maintain database" link=""></app-option>-->
    </app-dashboard>
</div>
`;

app_admin = {
    template: template,
};

Vue.component('app-admin', app_admin);