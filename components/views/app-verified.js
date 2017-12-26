template = `
<div>
    <div v-if="auth.type == 'Admin'">
        <app-admin></app-admin>
    </div>

    <div v-else-if="auth.type == 'Coordinator'">
        <app-coordinator></app-coordinator>
    </div>

    <div v-else-if="auth.type == 'Advisor'">
        <app-advisor></app-advisor>
    </div>

    <div v-else-if="auth.type == 'Supervisor'">
        <app-supervisor></app-supervisor>
    </div>

    <div v-else-if="auth.type == 'disabled'">
        <p style="text-align:center">Your account is disabled, contact system's admin!</p>
    </div>

    <div v-else>
        <p style="text-align:center">Loading!</p>
    </div>
</div>
`

Vue.component("app-verified", {
    template: template,
    props: {
        auth: JSON
    }
});