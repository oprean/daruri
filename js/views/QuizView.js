define([
  'jquery',
  'underscore',
  'backbone',
  'backbone.marionette',
  'text!templates/quiz.html',
  'modules/Utils',
  'modules/Constants',
  'jquery.qrcode',
], function($, _, Backbone, Marionette, quizTpl, Utils, Constants){
	var QuizView = Backbone.Marionette.ItemView.extend({
		template : _.template(quizTpl),
		initialize : function(options) {
			var quizId = options.quizId;
			this.result = Utils.getResult(quizId);
			this.status = Utils.getQuizStatus(quizId);
			this.model = Utils.getQuiz(quizId);
		},
		
		events : {
			'click .btn-start' : 'startQuiz'
		},
		
		startQuiz : function() {
			this.result.destroy( {wait: true});
		},
		
		templateHelpers : function() {
			return {
				status:this.status
			};
		},
		
		onRender : function() {
			this.$('.qrcode-container').qrcode({
				size:150,
				text: 'http://oprean.ddns.net/quizzes/#quiz/'+ this.model.id +'/home',
			});
			switch(this.status.id) {
				case 'done':
					this.$('.btn-result').css('display', 'inline-block');
					this.$('.label-started-on').css('display', 'inline-block');
					break;
				case 'progress':
					this.$('.btn-resume').css('display', 'inline-block');
					this.$('.label-started-on').css('display', 'inline-block');
					break;				
			}
		}
	});
	 
	return QuizView;
});