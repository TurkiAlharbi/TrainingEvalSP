app_evaluate_template = `
<div>
    <form>
        <div class="form-group col-sm-12">
            <div class="input-group">
                <span class="input-group-addon">Student</span>
                <select class="form-control" id="term">
                    <option>Ibrahim Al-Beladi</option>
                </select>
            </div>
            <br/>
            <div class="input-group">
                <span class="input-group-addon">Form</span>
                <select class="form-control" id="term">
                    <option>Summer training form #1</option>
                </select>
            </div>
            <hr/>
        </div>

        <div class="form-group col-sm-12">
            <div class="panel panel-primary">
            
                <div class="panel-heading ">Questions</div>
                    <div class="panel-body">
                        <p class="h5">Each question is in scale of 0-10</p>
                        <hr/>
                        <div v-for="q in questions">
                            <div class="form-group">
                                <label class="col-sm-5 control-label">{{ q }}</label>
                                <div class="col-sm-1">
                                    <input class="form-control" type="number" min=0 max=10>
                                </div>
                            </div>
                        </div>
                    </div>
                        
                </div>
            </div>
            <button class="btn btn-success">Submit evaluation</button>
        </div>
    </form>
<div>
`;

name = "Summer training form #1"
questions = ["Attendence", "Presentation", "Quality of work"];


app_evaluate = {
    template: app_evaluate_template,
};

Vue.component('app-evaluate', app_evaluate);