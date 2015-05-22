define([
  'jquery',
  'underscore',
  'backbone',
  'backbone.marionette',
  'collections/Quizzes',
  'models/Question',
  'text!templates/question.html',
], function($, _, Backbone, Marionette, Quizzes, Question, questionTpl){
	var QuestionView = Backbone.Marionette.ItemView.extend({
		template : _.template(questionTpl),
		events : {
			'click .answer' : 'storeNext'
		},
		
		initialize : function(options) {
			var self = this;
			var quizzes = new Quizzes();
			quizzes.fetch({
				success : function(collection) {
					var quiz = quizzes.get(options.quizId);
					var questions = quiz.get('questions');
					var progress = Math.round((options.questionId * 100)/questions.length)
					self.model = new Question(questions[options.questionId-1])
					
					self.model.set({
						progress: progress,
						quizId:quiz.get('id'),
						options: quiz.get('options'),
						next: (progress == 100)?'result':options.questionId,
						selected: null
					}) 
				}
			})
			console.log(this.model);
		},
			
		storeNext : function(e) {
			console.log($(e.target).val());
			app.router.navigate('#quiz/' + this.model.get('quizId') + '/' + this.model.get('next'), {trigger: true})
		}
		
	});
	 
	return QuestionView;
});