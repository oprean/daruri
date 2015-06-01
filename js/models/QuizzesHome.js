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
			if (Constants.DEBUG == false) {
				options.quizzes = 
				options.quizzes.slice(0, options.quizzes.length-2); 
			}
			
			_.each(options.quizzes, function(quiz){
				quiz['status'] = Utils.getQuizStatus(quiz.id);
				quizzes.push(quiz);  
			})
			options.quizzes = quizzes;
			 
			this.set(options);
		}
	});

	return QuizzesHome;
});