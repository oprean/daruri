define([
  'jquery',
  'underscore',
  'backbone',
  'backbone.marionette',
  'views/HomeView',
  'views/AboutView',
  'views/QuestionView',
  'views/ResultView',
], function($, _, Backbone, Marionette, 
	HomeView, AboutView, QuestionView, ResultView){
	var Controller = Marionette.Controller.extend({
	  initialize: function() {
	  },
	  
	  home: function() {
	  	console.log('home');
		app.mainRegion.show(new HomeView());
	  },
	  
	  about: function() {
	  	console.log('about');
		app.mainRegion.show(new AboutView());
	  },
	  
	  question: function(id) {
	  	console.log('question');
		app.mainRegion.show(new QuestionView());
		
	  },
	  
	  result: function() {
	  	console.log('result');
		app.mainRegion.show(new ResultView());
		
	  },
	});
	
	return Controller;
});