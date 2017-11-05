template = `
<div>
    <app-dashboard-no-container title="Supervisors management">
        <app-option name="Add a supervisor" link="./Advisor/addSupervisor.html" done="true"></app-option>
    </app-dashboard-no-container>

    <app-dashboard-no-container title="Students management">
        <app-option name="View students" link="./Advisor/viewStudents.html" done="true"></app-option>
        <app-option name="View contracts" link="./Advisor/viewContracts.html" done="true"></app-option>
    </app-dashboard-no-container>

    <app-dashboard-no-container title="Other utilities">
        <app-option name="Generate a report" link="./Advisor/generateReport.html"></app-option>
    </app-dashboard-no-container>
</div>
`;

app_advisor = {
    template: template,
};

Vue.component('app-advisor', app_advisor);