define([
  'jquery',
  'underscore',
  'backbone',
  'backbone.marionette',
  'text!templates/home.html',
], function($, _, Backbone, Marionette, homeTpl){
	var HomeView = Backbone.Marionette.ItemView.extend({
		template : _.template(homeTpl),
		initialize : function() {
			console.log(app.quiz);
		}
	});
	 
	return HomeView;
});