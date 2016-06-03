define([
	'vue',
	'text!./stopList.html'
], function (Vue, template) {
	return Vue.extend({
		data: function () {
			return {
				searchTerm: '',
				stops: [],
				loading: true
			};
		},
		computed: {
			displayedStops: function () {
				var regex = new RegExp('(^|\s)' + this.searchTerm, 'i');
				return this.stops.filter(function (stop) {
					return this.searchTerm && ((stop.stop_code +'').indexOf(this.searchTerm) === 0 || stop.stop_name.match(regex));
				}.bind(this));
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
					this.stops = JSON.parse(xhr.responseText);
				}
			}.bind(this);
			xhr.open('GET', '/stops.json', true);
			xhr.send();
		}
	});
});