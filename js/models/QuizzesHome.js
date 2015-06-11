define([
  'jquery',
  'underscore',
  'backbone',
  'modules/Constants',
  'modules/Utils'
], function($, _, Backbone, Constants, Utils){
	var QuizzesHome = Backbone.Model.extend({
		initialize: function(options) {
			var quizzes = [];			
			_.each(options.quizzes, function(quiz){
				quiz['status'] = Utils.getQuizStatus(quiz.id);
				quizzes.push(quiz);  
			});
			options.quizzes = quizzes;
			 
			this.set(options);
		}
	});

	return QuizzesHome;
});