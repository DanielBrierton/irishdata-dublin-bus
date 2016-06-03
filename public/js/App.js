define([
    'vue',
    'text!./app.html'
], function (Vue, template, Main) {
	return Vue.extend({
		template: template
	});
});