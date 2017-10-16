app_header_template = `
<div class="container" style="text-align: center;">
    <h3>Welcome back, {{name}}!</h3>
    <hr/>
</div>
`
app_header = {
    template: app_header_template,
    props:{
        name:String
    }
};

Vue.component('app-header', app_header);