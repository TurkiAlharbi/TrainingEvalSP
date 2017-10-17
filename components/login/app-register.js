app_register_template = `
<div id="register" class="tab-pane fade">
	<div class="container-fluid">
		<div class="row">

			<h2 class="text-center" style="color: #f0ad4e;">
				<Strong> Register </Strong>
			</h2>

			<hr/>
			<app-field iconClass="glyphicon glyphicon-user" inputType="text" app_placeholder="Username" app_name="name" app_div_class="iga1"></app-field>
			<app-field iconClass="glyphicon glyphicon-envelope" inputType="email" app_placeholder="E-Mail" app_name="mail" app_div_class="iga1"></app-field>
			<app-field iconClass="glyphicon glyphicon-lock" inputType="password" app_placeholder="Password" app_name="pass" app_div_class="iga1"></app-field>
			<hr/>

			<div class="row">
				<div class="col-xs-12 col-sm-12 col-md-12">
					<div class="form-group">
						<button type="submit" class="btn btn-lg btn-block btn-warning">Register</button>
					</div>
				</div>
			</div>

		</div>
	</div>
</div>
`;

app_register = {
	template: app_register_template
};

Vue.component('app-register', app_register);