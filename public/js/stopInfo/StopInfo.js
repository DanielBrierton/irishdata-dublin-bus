define([
	'vue',
	'text!./stopInfo.html'
], function (Vue, template) {
	return Vue.extend({
		template: template,
		data: function () {
			return {
				stopData: {
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
					this.stopData = JSON.parse(xhr.responseText);
				}
			}.bind(this);
			xhr.open('GET', '/rtpi/realtimebusinformation?stopid=' + this.$route.params.stop + '&format=json', true);
			xhr.send();
		}
	});
});