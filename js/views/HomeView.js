define([
  'jquery',
  'underscore',
  'backbone',
  'backbone.marionette',
  'text!templates/home.html',
  'collections/QuizzesCards',
  'models/QuizCard',
  'views/QuizCardView',
  'modules/Utils',
  'modules/Constants',
], function($, _, Backbone, Marionette, homeTpl, QuizzesCards, QuizCard, QuizCardView, Utils, Constants){
	var HomeView = Backbone.Marionette.CompositeView.extend({
		template : _.template(homeTpl),
		childViewContainer: '.quizzes-card-container',
		childView: QuizCardView,
		initialize : function(options) {
			var self = this;
			this.model = app.quizzes;
			console.log(this.model.get('quizzes'));
			this.collection = new QuizzesCards();
			_.each(this.model.get('quizzes'), function(quiz){
				self.collection.add(new QuizCard(quiz));
			});
		},
	});
	 
	return HomeView;
});