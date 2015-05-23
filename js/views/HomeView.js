define([
  'jquery',
  'underscore',
  'backbone',
  'backbone.marionette',
  'text!templates/home.html',
  'modules/Utils',
  'modules/Constants',
], function($, _, Backbone, Marionette, homeTpl, Utils, Constants){
	var HomeView = Backbone.Marionette.ItemView.extend({
		template : _.template(homeTpl),
		initialize : function(options) {
			var self = this;
			var quizId = options.quizId?options.quizId:Constants.DEFAULT_QUIZ
			var result = Utils.getResult(quizId);
			this.status = Utils.getQuizStatus(quizId);
			this.model = Utils.getQuiz(quizId);
		},
		
		templateHelpers : function() {
			return {
				status:this.status
			}
		},
		
		onRender : function() {
			switch(this.status.id) {
				case 'done':
					this.$('.btn-result').css('display', 'inline-block');
					break;
				case 'progress':
					this.$('.btn-resume').css('display', 'inline-block');
					break;
			}
		}
	});
	 
	return HomeView;
});