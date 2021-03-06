define([
  'jquery',
  'underscore',
  'backbone',
  'backbone.marionette',
  'views/HomeView',
  'views/AdminView',
  'views/StaticView',
  'views/QuizView',
  'views/QuestionView',
  'views/ResultView',
  'views/GroupsView',
  'views/LoginView',
  'views/sandbox/GeolocationView',
  'views/sandbox/QRCodeView',
  'views/sandbox/SurfaceView',
], function($, _, Backbone, Marionette, 
	HomeView, AdminView, StaticView, QuizView, QuestionView, ResultView, GroupsView, LoginView, GeolocationView, QRCodeView, SurfaceView){
	var Controller = Marionette.Controller.extend({
	  initialize: function() {
	  },
	  
	  home: function(quizId) {
	  	console.log('home ' + quizId);
		app.mainRegion.show(new HomeView({quizId: quizId}));
	  },

	  login: function() {
	  	console.log('login');
		app.mainRegion.show(new LoginView());
	  },

	  admin: function() {
	  	console.log('admin');
		app.mainRegion.show(new AdminView());
	  },
	  	  
	  static: function(file) {
		app.mainRegion.show(new StaticView({tpl:file}));
	  },
	   
	  quiz: function(quizId, questionId) {
	  	console.log('question');
	  	var view;
	  	switch(questionId) {
	  		case 'home':
	  			view = new QuizView({quizId: quizId});
	  			break;
	  		case 'result':
	  			view = new ResultView({quizId: quizId});
	  			break;
	  		case 'groups':
	  			view = new GroupsView({quizId: quizId});
	  			break;
	  		default:
	  			view = new QuestionView({
					quizId: quizId, 
					questionId: questionId
				});
	  	}
		app.mainRegion.show(view);
	  },
	  
	  test: function(feature) {
	  	var view;
		switch(feature) {
	  		case 'geolocation':
	  			view = new GeolocationView();
	  			break;
	  		case 'qrcode':
	  			view = new QRCodeView();
	  			break;
	  		case 'surface':
	  			view = new SurfaceView();
	  			break;
	  		default:
	  			view = new StaticView({tpl:feature});
	  	}
	  	app.mainRegion.show(view);
	  }
	});
	
	return Controller;
});