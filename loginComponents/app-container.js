app_container = {
    template: `
    <div class="container">
    <div class="row">
      <div class="col-md-6 col-md-offset-3">
        <div class="panel with-nav-tabs panel-info">

          <div class="panel-heading">
            <ul class="nav nav-tabs">
              <li class="active">
                <a href="#login" data-toggle="tab"> Login </a>
              </li>
              <li>
                <a href="#register" data-toggle="tab"> Register </a>
              </li>
            </ul>
          </div>

          <div class="panel-body">
            <div class="tab-content">
              <app-login></app-login>
              <app-register></app-register>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
      `
};

Vue.component('app-container', app_container);