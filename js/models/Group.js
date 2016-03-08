define([
  'jquery',
  'underscore',
  'backbone',
], function($, _, Backbone){
	var Group = Backbone.Model.extend({
		urlRoot: 'api/group',
		defaults : {
			id: null,
			name: null,
			description: null,
		}
	});

	return Group;
});