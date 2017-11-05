app_option_template = `
<div class="col-xs-12 col-sm-6 col-md-4 col-lg-3">
    <div class="card">
        <div class="thumbnail panel panel-primary">
            <div class="caption" style="text-align:center">
                <hr style="width:50%;margin:15px auto">
                <template v-if="!done">
                    <a v-if="!popup" style="color:red" :href="link" class="small">{{name}}</a>
                    <a v-if=" popup" style="color:red" target="_blank" :href="link+'?popup'" class="small" >{{name}}</a>
                </template>
                <template v-else>
                    <a v-if="!popup" :href="link" class="small">{{name}}</a>
                    <a v-if=" popup" target="_blank" :href="link+'?popup'" class="small" >{{name}}</a>
                </template>
                <hr style="width:50%;margin:15px auto">
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
        done: Boolean
    },
};

Vue.component('app-option', app_option);