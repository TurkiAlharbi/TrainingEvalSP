app_template = `
<div>
    <app-container></app-container>
    <app-forget-modal></app-forget-modal>
</div>
`;

app = new Vue({
    el: '#app',
    template: app_template
});