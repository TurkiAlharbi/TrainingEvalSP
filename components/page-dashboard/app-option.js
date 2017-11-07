app_option_template = `
<div class="col-xs-12 col-sm-6 col-md-4 col-lg-3" style="margin:3px 0 0 0">
    <div class="card" style="margin:3px 0 0 0">
        <div class="thumbnail panel panel-primary" style="margin:0 0 5px 0">
            <div class="caption" style="text-align:center" v-if="!wip">
                <hr style="width:50%;margin:10px auto">
                <template v-if="!done">
                    <a v-if="!popup" style="color:red" :href="link" class="small">{{name}}</a>
                    <a v-if=" popup" style="color:red" target="_blank" :href="link+'?popup'" class="small" >{{name}}</a>
                </template>
                <template v-else>
                    <a v-if="!popup" :href="link" class="small">{{name}}</a>
                    <a v-if=" popup" target="_blank" :href="link+'?popup'" class="small" >{{name}}</a>
                </template>
                <hr style="width:50%;margin:10px auto">
            </div>

            <div class="caption" style="text-align:center;background-color:#eee" v-else>
                <p class="small">{{name}}</p>
                <hr style="width:50%;margin:10px auto">
                <p  class="small" >Coming up in next sprint(s)</p>
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
        popup: Boolean,
        done: Boolean,
        wip: Boolean
    },
};

Vue.component('app-option', app_option);