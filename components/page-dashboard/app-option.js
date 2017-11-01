app_option_template = `
<div class="col-xs-12 col-sm-6 col-md-4 col-lg-3">
    <div class="card">
        <div v-if="link!=''" class="thumbnail panel panel-primary">
            <div class="caption" style="text-align:center">
                <hr style="width:50%;margin:15px auto">
                <a v-if="!popup" :href="link" class="small">{{name}}</a>
                <a v-if="popup" target="_blank" :href="link+'?popup'" class="small" >{{name}}</a>
                <hr style="width:50%;margin:15px auto">
            </div>
        </div>
        <div v-else class="thumbnail">
            <div class="caption" style="text-align:center;background-color:#eee;">
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
        popup: Boolean
    }
};

Vue.component('app-option', app_option);