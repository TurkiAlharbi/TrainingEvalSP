template = `
<div>
    <app-dashboard title="Coordinators management">
        <app-option name="View coordinators" link="./Admin/viewCoordinators.html" done="true"></app-option>
        <app-option name="Add a coordinator" link="./Admin/addCoordinator.html" done="true"></app-option>
        <app-option name="Remove a coordinator" link="./Admin/removeCoordinators.html" done="true"></app-option>
    </app-dashboard>

    <app-dashboard title="Other utilities">
        <app-option name="Generate a report" link="./Admin/generateReport.html"></app-option>
        <!--<app-option name="Maintain database" link=""></app-option>-->
    </app-dashboard>
</div>
`;

app_admin = {
    template: template,
};

Vue.component('app-admin', app_admin);