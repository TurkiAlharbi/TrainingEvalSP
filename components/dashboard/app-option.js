app_option_template = `
<div class="col-xs-12 col-sm-6 col-md-4 col-lg-3">
    <div class="card">
        <div class="thumbnail">
            <div class="caption" style="text-align:center"  :style="{ 'background-color'  : '#eee' }">
                <div v-if="link!=''">
                    <hr style="width:50%;margin:15px auto">
                    <a :href="link" class="small">{{name}}</a>
                    <hr style="width:50%;margin:15px auto">
                </div>
                <div v-else>
                    <p>{{name}}</p>
                    <hr style="width:50%;margin:15px auto">
                    <p class="small">Coming soon!</p>
                </div>
            </div>
            <div v-else class="caption" style="text-align:center"  :style="{ 'background-color'  : '#eee' }">
                <p>{{name}}</p>
                <hr style="width:50%;margin:15px auto">
                <p style="font-size:12px">Work in progress!</p>
            </div>
        </div>
    </div>
</div>
`
app_option = {
    template: app_option_template,
    props: {
        name: String,
        link: String,
    }
};

Vue.component('app-option', app_option);