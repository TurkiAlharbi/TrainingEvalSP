template = `
<div>
    <app-header name="Advisor"></app-header>

    <app-dashboard title="Supervisors management">
        <app-option name="Add a supervisor" link="./addSupervisor.html"></app-option>
    </app-dashboard>

    <app-dashboard title="Students management">
        <app-option name="View students" link="./viewStudents.html"></app-option>
        <app-option name="View contracts" link="./viewContracts.html"></app-option>
    </app-dashboard>

    <app-dashboard title="Other utilities">
        <app-option name="Generate a report" link="./generateReport.html"></app-option>
    </app-dashboard>
</div>
`;

app_advisor = {
    template: template,
};

Vue.component('app-advisor', app_advisor);