define([
  'jquery',
  'underscore',
  'backbone',
  'backbone.marionette',
  'collections/Quizzes',
  'models/Quiz',
  'text!templates/home.html',
  'modules/Utils',
  'modules/Constants'
], function($, _, Backbone, Marionette, Quizzes, Quiz, homeTpl, Utils, Constants){
	var HomeView = Backbone.Marionette.ItemView.extend({
		template : _.template(homeTpl),
		initialize : function(options) {
			var self = this;
			var quizId = options.quizId?options.quizId:Constants.DEFAULT_QUIZ
			var quizzes = new Quizzes();
			quizzes.fetch({
				success: function(collection) {
					self.model = collection.get(quizId);
					if (!self.model) {
						self.model = new Quiz(Utils.loadQuiz(quizId));
						collection.add(self.model);
						self.model.save();
					}					
				}
			})
			console.log(this.model);
		}
	});
	 
	return HomeView;
});