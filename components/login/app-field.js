app_field_template = `
<div class="row">
    <div class="col-xs-12 col-sm-12 col-md-12">
        <div class="form-group">
            <div class="input-group">

            <div class="input-group-addon" :class="app_div_class">
                <span :class="iconClass"></span>
            </div>
            <input :type="inputType" :placeholder="app_placeholder" :name="app_name" class="form-control">

            </div>
        </div>
    </div>
</div>
`;

app_field = {
    template: app_field_template,
    props: {
        iconClass: String,
        inputType: String,
        app_placeholder: String,
        app_name: String,
        app_div_class: String
    }
};

Vue.component('app-field', app_field);