template = `
<div>
    
    <app-header name="Coordinator"></app-header>

    <app-dashboard title="Advisors management">
        <app-option name="View advisors" link="./viewAdvisors.html"></app-option>
        <app-option name="Add an advisor" link="./addAdvisor.html"></app-option>
        <app-option name="Remove an advisor" link="./removeAdvisors.html"></app-option>
    </app-dashboard>

    <app-dashboard title="Students management">
        <app-option name="View students" link="./viewStudents.html"></app-option>
        <app-option name="Add a student" link="addStudent.html"></app-option>
        <app-option name="Remove a student" link="./removeStudents.html"></app-option>
        <app-option name="Assign students to advisors" link="./assign.html"></app-option>
    </app-dashboard>

    <app-dashboard title="Evaluations management">
        <app-option name="View evaluations" link="./viewEvaluations.html"></app-option>
        <app-option name="Set up forms" link="./setup.html"></app-option>
        <app-option name="Set up evaluation availability " link="./evaluationAvailability.html"></app-option>
        <app-option name="Get students' marks" link="./getMarks.html"></app-option>
    </app-dashboard>

    <div class="container" style="text-align: center;">
        <hr/>
        <p class="h3">Advisor's roles</p>
        <hr/>
    </div>

    <!-- Advisor's view -->
    <app-dashboard title="Supervisors management">
        <app-option name="Add a supervisor" link="../Advisor/addSupervisor.html" popup="true"></app-option>
    </app-dashboard>

    <app-dashboard title="Students management">
        <app-option name="View students" link="../Advisor/viewStudents.html" popup="true"></app-option>
        <app-option name="View contracts" link="../Advisor/viewContracts.html" popup="true"></app-option>
    </app-dashboard>

    <app-dashboard title="Other utilities">
        <app-option name="Generate a report" link="../Advisor/generateReport.html" popup="true"></app-option>
    </app-dashboard>
    <!--  -->

</div>
`;

app_coordinator = {
    template: template,
};

Vue.component('app-coordinator', app_coordinator);