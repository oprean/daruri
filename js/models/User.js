define([
  'jquery',
  'underscore',
  'backbone',
], function($, _, Backbone){
	var User = Backbone.Model.extend({
		urlRoot: 'api/user',
		defaults : {
			username: null,
			password: null,
			email: null,
			is_admin: null,
		}
	});

	return User;
});