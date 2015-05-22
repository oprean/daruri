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
	  
	  home: function(quizId) {
	  	console.log('home' + quizId);
		app.mainRegion.show(new HomeView({quizId: quizId}));
	  },
	  
	  about: function() {
	  	console.log('about');
		app.mainRegion.show(new AboutView());
	  },
	  
	  quiz: function(quizId, questionId) {
	  	console.log('question');
	  	var view;
	  	switch(questionId) {
	  		case 'home':
	  			view = new HomeView({quizId: quizId});
	  			break;
	  		case 'result':
	  			view = new ResultView({quizId: quizId});
	  			break;
	  		default:
	  			view = new QuestionView({
					quizId: quizId, 
					questionId: questionId
				})
	  	}
		app.mainRegion.show(view);
	  },
	  
	  result: function() {
	  	console.log('result');
		app.mainRegion.show();
		
	  },
	});
	
	return Controller;
});