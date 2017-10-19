app_setup_new_template = `
<form>
    <h3>New form</h3>
    <hr/>
    <div class="form-group col-sm-6">
        <div class="input-group">
            <span class="input-group-addon">Name</span>
            <input id="name" type="text" class="form-control">
        </div>
    </div>

    <div class="form-group col-sm-6">
        <div class="input-group">
            <span class="input-group-addon">Terms</span>
            <select class="form-control" id="term">
                <option>163</option>
                <option>163 + 171</option>
                <option>172 + 173</option>
                <option>173</option>
                <option>173 + 181</option>
            </select>
        </div>
    </div>

    <div class="form-group col-sm-12">
        <div class="panel panel-primary">
            <div class="panel-heading ">Questions</div>
                <table class="table">
                    <tbody>
                        <template v-for="q in 2">
                            <tr class="col-xl-12" style="text-align:center">
                                <td class="col-xl-5">
                                    <input id="name" type="text" class="form-control" style="text-align: center;">
                                </td>
                                <td class="col-xl-1">
                                    <button class="btn btn-danger">X</button>
                                </td>
                            </tr>
                        </template>
                    </tbody>
                </table>
                <br/>
                <span class="btn btn-primary">Add extra question</span>
                <br/>
                <br/>
            </div>
        </div>
        <button class="btn btn-success">Submit</button>
    </div>
</form>
`;

app_setup_new = {
    template: app_setup_new_template,
};

Vue.component('app-setup-new', app_setup_new);