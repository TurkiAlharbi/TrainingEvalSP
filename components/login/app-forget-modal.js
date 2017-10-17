app_forget_modal_template = `
<div class="modal fade" id="forgot">
    <div class="modal-dialog">
        <div class="modal-content">

            <div class="modal-header">
                <button type="button" class="close" data-dismiss='modal' aria-hidden="true">
                    <span class="glyphicon glyphicon-remove"></span>
                </button>

                <h4 class="modal-title" style="font-size: 32px; padding: 12px;"> Recover Your Password </h4>
            </div>

            <div class="modal-body">
                <div class="container-fluid">
                    <app-field iconClass="glyphicon glyphicon-envelope" inputType="email" app_placeholder="E-Mail" app_name="email" app_div_class="iga2"></app-field>
                    <app-field iconClass="glyphicon glyphicon-lock" inputType="password" app_placeholder="Password" app_name="newpwd" app_div_class="iga2"></app-field>
                </div>
            </div>

            <div class="modal-footer">
                <div class="form-group">
                    <button type="submit" class="btn btn-lg btn-info"> Recover
                        <span class="glyphicon glyphicon-saved"></span>
                    </button>

                    <button type="button" data-dismiss="modal" class="btn btn-lg btn-default"> Cancel
                        <span class="glyphicon glyphicon-remove"></span>
                    </button>
                </div>
            </div>
            
        </div>
    </div>
</div>
`;

app_forget_modal = {
    template: app_forget_modal_template
};

Vue.component('app-forget-modal', app_forget_modal);