app_forget_modal = {
    template: `
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
                <div class="row">
                <div class="col-xs-12 col-sm-12 col-md-12">
                    <div class="form-group">
                    <div class="input-group">
                        <div class="input-group-addon iga2">
                        <span class="glyphicon glyphicon-envelope"></span>
                        </div>
                        <input type="email" class="form-control" placeholder="Enter Your E-Mail ID" name="email">
                    </div>
                    </div>
                </div>
                </div>

                <div class="row">
                <div class="col-xs-12 col-sm-12 col-md-12">
                    <div class="form-group">
                    <div class="input-group">
                        <div class="input-group-addon iga2">
                        <span class="glyphicon glyphicon-lock"></span>
                        </div>
                        <input type="password" class="form-control" placeholder="Enter Your New Password" name="newpwd">
                    </div>
                    </div>
                </div>
                </div>
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
    `
};

Vue.component('app-forget-modal', app_forget_modal);