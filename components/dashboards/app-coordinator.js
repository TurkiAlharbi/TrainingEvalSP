template = `
<div>

    <app-expandable title="Advisors management" expanded>
        <app-option name="Add an advisor" link="./Coordinator/addAdvisor.html"></app-option>
        <app-option name="View and remove advisors" link="./Coordinator/removeAdvisors.html"></app-option>
        <app-option name="Assign students to advisors" link="./Coordinator/assign.html"></app-option>
    </app-expandable>

    <app-expandable title="Students management" expanded>
        <app-option name="Add a student" link="./Coordinator/addStudent.html"></app-option>
        <app-option name="View and remove students" link="./Coordinator/removeStudents.html"></app-option>
        <app-option name="View contracts" link="./Coordinator/viewContracts.html"></app-option>
    </app-expandable>

    <app-expandable title="Evaluations management" expanded>
        <app-option name="View evaluations" link="./Coordinator/viewEvaluations.html"></app-option>
        <app-option name="Set up forms" link="./Coordinator/setup.html"></app-option>
        <app-option name="Set up evaluation availability " link="./Coordinator/evaluationAvailability.html"></app-option>
        <app-option name="Get students' marks" link="./Coordinator/getMarks.html"></app-option>
    </app-expandable>

    <app-expandable title="Other utilities" expanded>
        <app-option name="Generate a report" link="../Coordinator/generateReport.html"></app-option>
    </app-expandable>
    
    <!-- Advisor's view -->
    <app-expandable title="Advisor's roles">
        <app-option name="Add a supervisor" link="../Advisor/addSupervisor.html"></app-option>
        <app-option name="View students" link="../Advisor/viewStudents.html"></app-option>
        <app-option name="View contracts" link="../Advisor/viewContracts.html"></app-option>
        <app-option name="View evaluations" link="./Advisor/viewEvaluations.html"></app-option>
        <app-option name="Generate a report" link="../Advisor/generateReport.html"></app-option>
    </app-expandable>

</div>
`;

app_coordinator = {
    template: template,
};

Vue.component('app-coordinator', app_coordinator);