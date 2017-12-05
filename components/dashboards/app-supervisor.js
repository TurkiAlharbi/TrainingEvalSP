template = `
<div>

    <app-dashboard-no-container title="Students management">
        <app-option name="View students" link="./Supervisor/viewStudents.html"></app-option>
        <app-option name="Evaluate" link="./Supervisor/evaluate.html"></app-option>
    </app-dashboard-no-container>
    
</div>
`;

app_supervisor = {
    template: template,
};

Vue.component('app-supervisor', app_supervisor);