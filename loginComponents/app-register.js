app_register = {
  template: `
    <div id="register" class="tab-pane fade">
    <div class="container-fluid">
      <div class="row">
        <h2 class="text-center" style="color: #f0ad4e;">
          <Strong> Register </Strong>
        </h2>
        <hr />
        <div class="row">
          <div class="col-xs-12 col-sm-12 col-md-12">
            <div class="form-group">
              <div class="input-group">
                <div class="input-group-addon iga1">
                  <span class="glyphicon glyphicon-user"></span>
                </div>
                <input type="text" class="form-control" placeholder="Enter User Name" name="name">
              </div>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-xs-12 col-sm-12 col-md-12">
            <div class="form-group">
              <div class="input-group">
                <div class="input-group-addon iga1">
                  <span class="glyphicon glyphicon-envelope"></span>
                </div>
                <input type="email" class="form-control" placeholder="Enter E-Mail" name="mail">
              </div>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-xs-12 col-sm-12 col-md-12">
            <div class="form-group">
              <div class="input-group">
                <div class="input-group-addon iga1">
                  <span class="glyphicon glyphicon-lock"></span>
                </div>
                <input type="password" class="form-control" placeholder="Enter Password" name="pass">
              </div>
            </div>
          </div>
        </div>
        <hr>
        <div class="row">
          <div class="col-xs-12 col-sm-12 col-md-12">
            <div class="form-group">
              <button type="submit" class="btn btn-lg btn-block btn-warning"> Register</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div><div id="register" class="tab-pane fade">
  <div class="container-fluid">
    <div class="row">
      <h2 class="text-center" style="color: #f0ad4e;">
        <Strong> Register </Strong>
      </h2>
      <hr />
      <div class="row">
        <div class="col-xs-12 col-sm-12 col-md-12">
          <div class="form-group">
            <div class="input-group">
              <div class="input-group-addon iga1">
                <span class="glyphicon glyphicon-user"></span>
              </div>
              <input type="text" class="form-control" placeholder="Enter User Name" name="name">
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-xs-12 col-sm-12 col-md-12">
          <div class="form-group">
            <div class="input-group">
              <div class="input-group-addon iga1">
                <span class="glyphicon glyphicon-envelope"></span>
              </div>
              <input type="email" class="form-control" placeholder="Enter E-Mail" name="mail">
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-xs-12 col-sm-12 col-md-12">
          <div class="form-group">
            <div class="input-group">
              <div class="input-group-addon iga1">
                <span class="glyphicon glyphicon-lock"></span>
              </div>
              <input type="password" class="form-control" placeholder="Enter Password" name="pass">
            </div>
          </div>
        </div>
      </div>
      <hr>
      <div class="row">
        <div class="col-xs-12 col-sm-12 col-md-12">
          <div class="form-group">
            <button type="submit" class="btn btn-lg btn-block btn-warning"> Register</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
    `
};

Vue.component('app-register', app_register);