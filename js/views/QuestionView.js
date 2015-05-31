define([
  'jquery',
  'underscore',
  'backbone',
  'backbone.marionette',
  'modules/Utils',
  'modules/Constants',
  'text!templates/question.html',
], function($, _, Backbone, Marionette, Utils, Constants, questionTpl){
	var QuestionView = Backbone.Marionette.ItemView.extend({
		template : _.template(questionTpl),
		events : {
			'click .answer' : 'answer'
		},
		
		initialize : function(options) {
			var self = this;
			this.model = Utils.getQuestion(options.quizId, options.questionId)
			console.log(this.model);
		},
			
		answer : function(e) {
			Utils.updateAnswer(this.model, $(e.target).val());
			this.$('.radio-option').removeClass('radio-selected');
			$(e.target).closest('.radio-option').addClass('radio-selected');
			
			_.delay(this.moveNext, Constants.NEXT_QUESTION_DELAY, this.model)
		},
		
		moveNext : function(model) {
			var button = model.get('button');
			app.router.navigate('#quiz/' + model.get('quiz_id') + '/' + button.next.url, {trigger: true})			
		}
		
	});
	 
	return QuestionView;
});