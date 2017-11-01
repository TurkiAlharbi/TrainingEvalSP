template = `
<div>
    <app-header name="Supervisor"></app-header>

    <app-dashboard title="Students management">
        <app-option name="View students" link="./Supervisor/viewStudents.html"></app-option>
        <app-option name="Evaluate" link="./Supervisor/evaluate.html"></app-option>
    </app-dashboard>
</div>
`;

app_supervisor = {
    template: template,
};

Vue.component('app-supervisor', app_supervisor);