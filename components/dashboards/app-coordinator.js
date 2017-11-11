template = `
<div>
    <app-dashboard-no-container title="Advisors management">
        <app-option name="View advisors" link="./Coordinator/viewAdvisors.html" done="true"></app-option>
        <app-option name="Add an advisor" link="./Coordinator/addAdvisor.html" done="true"></app-option>
        <app-option name="Remove an advisor" link="./Coordinator/removeAdvisors.html" done="true"></app-option>
    </app-dashboard-no-container>

    <app-dashboard-no-container title="Students management">
        <app-option name="View students" link="./Coordinator/viewStudents.html" done="true"></app-option>
        <app-option name="Add a student" link="./Coordinator/addStudent.html" done="true"></app-option>
        <app-option name="Remove a student" link="./Coordinator/removeStudents.html" done="true"></app-option>
        <app-option name="Assign students to advisors" link="./Coordinator/assign.html" done="true"></app-option>
    </app-dashboard-no-container>

    <app-dashboard-no-container title="Evaluations management">
        <app-option name="View evaluations" link="./Coordinator/viewEvaluations.html" done="true"></app-option>
        <app-option name="Set up forms" link="./Coordinator/setup.html" done="true"></app-option>
        <app-option name="Set up evaluation availability " link="./Coordinator/evaluationAvailability.html" done="true"></app-option>
        <app-option name="Get students' marks" link="./Coordinator/getMarks.html" wip="true"></app-option>
    </app-dashboard-no-container>

    <!-- Advisor's view -->
    <app-dashboard-no-container title="Advisor's roles">
        <app-option name="Add a supervisor" link="../Advisor/addSupervisor.html" popup="true" done="true"></app-option>
        <app-option name="View students" link="../Advisor/viewStudents.html" popup="true" done="true"></app-option>
        <app-option name="View contracts" link="../Advisor/viewContracts.html" popup="true" done="true"></app-option>
        <app-option name="Generate a report" link="../Advisor/generateReport.html" popup="true"></app-option>
    </app-dashboard-no-container>
    <!--  -->

</div>
`;

app_coordinator = {
    template: template,
};

Vue.component('app-coordinator', app_coordinator);