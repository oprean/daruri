define([
  'jquery',
  'underscore',
  'backbone',
  'backbone.marionette',
  'modules/Utils',
  'text!templates/question.html',
], function($, _, Backbone, Marionette, Utils, questionTpl){
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
			this.$('.btn-next-question').css('display','inline-block');
			this.$('.btn-next-question').addClass('animated fadeIn');
		}
		
	});
	 
	return QuestionView;
});