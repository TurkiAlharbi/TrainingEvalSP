app_login_template = `
<div id="login" class="tab-pane fade in active register">
	<div class="container-fluid">
		<div class="row">
			<h2 class="text-center" style="color: #5cb85c;">
				<strong> Login </strong>
			</h2>
			
			<hr/>
			<app-field iconClass="glyphicon glyphicon-user" inputType="text" app_placeholder="Username" app_name="uname"></app-field>
			<app-field iconClass="glyphicon glyphicon-lock" inputType="password" app_placeholder="Password" app_name="pass"></app-field>

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

			<hr/>
			<hr/>
			
			<div class="row">
				<div class="col-xs-12 col-sm-12 col-md-12">
					<button type="submit" class="btn btn-success btn-block btn-lg"> Login </button>
				</div>
			</div>
			
		</div>
	</div>
</div>
`;

app_login = {
    template: app_login_template
};

Vue.component('app-login', app_login);