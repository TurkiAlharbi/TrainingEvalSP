template = `
<div>

    <app-dashboard-no-container title="Students & supervisors management">
        <app-option name="View students" link="./Advisor/viewStudents.html"></app-option>
        <app-option name="View contracts" link="./Advisor/viewContracts.html"></app-option>
        <app-option name="Add a supervisor" link="./Advisor/addSupervisor.html"></app-option>
        <app-option name="View evaluations" link="./Advisor/viewEvaluations.html"></app-option>
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