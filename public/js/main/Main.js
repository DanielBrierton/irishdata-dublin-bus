define([
    'vue',
    'text!./main.html',
    'routeList/RouteList',
    'stopList/StopList'
], function (Vue, template, RouteList, StopList) {
	return Vue.extend({
		components: {
			'route-list': RouteList,
			'stop-list': StopList
		},
		template: template,
		ready: function () {
			var tabs = this.$el.querySelectorAll('.mdl-layout__tab');
			var panels = this.$el.querySelectorAll('.mdl-layout__tab-panel');
			var layout = new MaterialLayout(this.$el);
			new MaterialLayoutTab(tabs[0], tabs, panels, layout);
			new MaterialLayoutTab(tabs[1], tabs, panels, layout);
			new MaterialLayoutTab(tabs[2], tabs, panels, layout);
		}
	});
});