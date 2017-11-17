template = `
<div>
    <app-dashboard-no-container title="Coordinators management">
        <app-option name="Add a coordinator" link="./Admin/addCoordinator.html" done="true"></app-option>
        <app-option name="View and remove coordinators" link="./Admin/viewCoordinators.html" done="true"></app-option>
    </app-dashboard-no-container>

    <app-dashboard-no-container title="Other utilities">
        <app-option name="Generate a report" link="./Admin/generateReport.html" done="true"></app-option>
    </app-dashboard-no-container>
</div>
`;

app_admin = {
    template: template,
};

Vue.component('app-admin', app_admin);