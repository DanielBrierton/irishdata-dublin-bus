define([
	'vue',
	'text!./routeList.html'
], function (Vue, template) {
	return Vue.extend({
		data: function () {
			return {
				routes: [],
				searchTerm: '',
				loading: true
			};
		},
		computed: {
			displayedRoutes: function () {
				if (this.searchTerm === '') {
					return this.routes;
				} else {
					return this.routes.filter(function (route) {
						return (route.route +'').indexOf(this.searchTerm) === 0;
					}.bind(this));
				}
			}
		},
		template: template,
		ready: function () {
			new MaterialTextfield(this.$el.querySelector('.mdl-js-textfield'));
			new MaterialSpinner(this.$el.querySelector('.mdl-js-spinner'));

			var xhr = new XMLHttpRequest();
			xhr.onreadystatechange = function () {
				if (xhr.readyState === 4 && xhr.status === 200) {
					this.loading = false;
					this.routes = JSON.parse(xhr.responseText).results.filter(function (route) {
						return route.route.indexOf('bac|') !== 0;
					});
				}
			}.bind(this);
			xhr.open('GET', 'rtpi/routelistinformation?operator=bac', true);
			xhr.send();
		}
	});
});