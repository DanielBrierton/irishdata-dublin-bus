define([
	'vue',
	'text!./routeInfo.html'
], function (Vue, template) {
	return Vue.extend({
		template: template,
		data: function () {
			return {
				routeData: {
					results: []
				},
				loading: true
			};
		},
		ready: function () {
			new MaterialLayout(this.$el);
			new MaterialSpinner(this.$el.querySelector('.mdl-js-spinner'));
			var xhr = new XMLHttpRequest();
			xhr.onreadystatechange = function () {
				if (xhr.readyState === 4 && xhr.status === 200) {
					this.loading = false;
					this.routeData = JSON.parse(xhr.responseText);
				}
			}.bind(this);
			xhr.open('GET', '/rtpi/routeinformation?routeid=' + this.$route.params.route + '&operator=bac&format=json', true);
			xhr.send();
		}
	});
});