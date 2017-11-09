template = `
<div>
    <app-dashboard-no-container title="Students management">
        <app-option name="View students" link="./Supervisor/viewStudents.html" done="true"></app-option>
        <app-option name="Evaluate" link="./Supervisor/evaluate.html" done="true"></app-option>
    </app-dashboard-no-container>
</div>
`;

app_supervisor = {
    template: template,
};

Vue.component('app-supervisor', app_supervisor);