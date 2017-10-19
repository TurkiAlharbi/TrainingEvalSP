app_setup_modify_template = `
<form>
    <h3>Modify form</h3>
    <hr/>
    <div class="form-group col-sm-12">
        <div class="input-group">
            <span class="input-group-addon">Form</span>
            <select class="form-control" id="term">
                <option>Summer training form #1 (Term 163)</option>
            </select>
        </div>
    </div>
    <hr/>
    <hr/>
    <hr/>
    <hr/>
    <div class="form-group col-sm-6">
        <div class="input-group">
            <span class="input-group-addon">Name</span>
            <input id="name" type="text" class="form-control" :value="name">
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
                        <template v-for="q in questions">
                            <tr class="col-xl-12" style="text-align:center">
                                <td class="col-xl-5">
                                    <input id="name" type="text" class="form-control" style="text-align: center;" :value="q">
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

name = "Summer training form #1"
questions = ["Attendence", "Presentation", "Quality of work"];


app_setup_modify = {
    template: app_setup_modify_template,
};

Vue.component('app-setup-modify', app_setup_modify);