define([
  'jquery',
  'underscore',
  'backbone',
  'backbone.marionette',
  'text!templates/home.html',
  'modules/Utils',
  'modules/Constants',
], function($, _, Backbone, Marionette, homeTpl, Utils, Constants){
	var HomeView = Backbone.Marionette.ItemView.extend({
		template : _.template(homeTpl),
		initialize : function(options) {
			this.model = app.quizzes;
		},
	});
	 
	return HomeView;
});