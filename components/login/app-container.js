app_container_template = `
<div class="container">
	<div class="row">
		<div class="col-md-6 col-md-offset-3">
			<div class="panel panel-success">
				<div class="panel-body">
					<app-login></app-login>
				</div>
			</div>
		</div>
	</div>
</div>
`;

app_container = {
	template: app_container_template
};

Vue.component('app-container', app_container);