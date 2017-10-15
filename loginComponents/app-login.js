app_login = {
    template: `
    <div id="login" class="tab-pane fade in active register">
    <div class="container-fluid">
      <div class="row">
        <h2 class="text-center" style="color: #5cb85c;">
          <strong> Login </strong>
        </h2>
        <hr />

        <div class="row">
          <div class="col-xs-12 col-sm-12 col-md-12">
            <div class="form-group">
              <div class="input-group">
                <div class="input-group-addon">
                  <span class="glyphicon glyphicon-user"></span>
                </div>
                <input type="text" placeholder="User Name" name="uname" class="form-control">
              </div>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-xs-12 col-sm-12 col-md-12">
            <div class="form-group">
              <div class="input-group">
                <div class="input-group-addon">
                  <span class="glyphicon glyphicon-lock"></span>
                </div>

                <input type="password" placeholder="Password" name="pass" class="form-control">
              </div>
            </div>
          </div>
        </div>

        <div class="col-xs-12 col-sm-12 col-md-12">
          <div class="col-xs-6 col-sm-6 col-md-6">
            <div class="form-group">
              <input type="checkbox" name="check" checked> Remember Me
            </div>
          </div>

          <div class="col-xs-6 col-sm-6 col-md-6">
            <div class="form-group">
              <a href="#forgot" data-toggle="modal"> Forgot Password? </a>
            </div>
          </div>
        </div>
        <hr />
        <div class="row">
          <div class="col-xs-12 col-sm-12 col-md-12">
            <button type="submit" class="btn btn-success btn-block btn-lg"> Login </button>
          </div>
        </div>

      </div>
    </div>
  </div>
    `
};

Vue.component('app-login', app_login);