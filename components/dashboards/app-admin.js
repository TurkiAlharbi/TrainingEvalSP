template = `
<div>

    <app-dashboard-no-container title="Coordinators management">
        <app-option name="Add a coordinator" link="./Admin/addCoordinator.html"></app-option>
        <app-option name="View and remove coordinators" link="./Admin/viewCoordinators.html"></app-option>
        <app-option name="Activate coordinators" link="./Admin/activateCoordinators.html"></app-option>
        <app-option name="Change majors" link="./Admin/changeMajors.html"></app-option>
    </app-dashboard-no-container>

    <app-dashboard-no-container title="Other utilities">
        <app-option name="Generate a report" link="./Admin/generateReport.html"></app-option>
        <app-option name="Remove osbelete supervisors" link="./Admin/removeSupervisor.html"></app-option>
    </app-dashboard-no-container>

</div>
`;

app_admin = {
    template: template,
};

Vue.component('app-admin', app_admin);