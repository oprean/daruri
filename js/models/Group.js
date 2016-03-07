define([
  'jquery',
  'underscore',
  'backbone',
], function($, _, Backbone){
	var Group = Backbone.Model.extend({
		defaults : {
			id: null,
			name: null,
			description: null,
		}
	});

	return Group;
});