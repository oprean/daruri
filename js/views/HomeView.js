define([
  'jquery',
  'underscore',
  'backbone',
  'backbone.marionette',
  'text!templates/home.html',
  'models/QuizzesHome',
  'modules/Utils',
  'modules/Constants',
], function($, _, Backbone, Marionette, homeTpl, QuizzesHome, Utils, Constants){
	var HomeView = Backbone.Marionette.ItemView.extend({
		template : _.template(homeTpl),
		initialize : function(options) {
			var self = this;
			var quizzesJson = Utils.getJson('quizzes');
			this.model = new QuizzesHome(quizzesJson);
		},
	});
	 
	return HomeView;
});