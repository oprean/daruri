define([
  'jquery',
  'underscore',
  'backbone',
], function($, _, Backbone){
	var Group = Backbone.Model.extend({
		defaults : {
			name: null,
			description: null,
		}
	});

	return Group;
});