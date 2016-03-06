define([
  'jquery',
  'underscore',
  'backbone',
], function($, _, Backbone){
	var User = Backbone.Model.extend({
		defaults : {
			username: null,
			email: null,
		}
	});

	return User;
});