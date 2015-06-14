define([
  'jquery',
  'underscore',
  'backbone',
  'backbone.marionette',
  'text!templates/result.html',
  'modules/Utils',
], function($, _, Backbone, Marionette, resultTpl, Utils){
	var ResultView = Backbone.Marionette.ItemView.extend({
		template : _.template(resultTpl),
		initialize : function(options) {
			Utils.generateResultStatistics(options.quizId);
			this.model = Utils.getResult(options.quizId);
			this.quiz = Utils.getQuiz(options.quizId);
		},
		events : {
			'click .btn-generate-pdf' : 'generatePdf',
			'click .btn-email' : 'email',
			'click .score-item' : 'toggleDescription'
		},
		
		toggleDescription : function(e) {			
			this.$('.score-description').toggle();
		},
		
		email : function() {
			var self = this;
			$.ajax({
				type: "POST",
				dataType: "json",
				url: 'api/mail',
				data: JSON.stringify({
					name: this.$('#name').val(),
					email: this.$('#email').val(),
					subject: this.quiz.get('name') + ' results',
					html: this.$('.result-container').html(),
					data: this.model
				}), 
				success: function(result) {
					if (result.status == 'success') {
						self.model.save();
						self.$('.send-email-response').html('<div role="alert" class="alert alert-success"><strong>Success!</strong> '+ result.data.message +'</div>');
					} else {
						self.$('.send-email-response').html('<div role="alert" class="alert alert-danger"><strong>Error! </strong> '+ result.data.message +'</div>');
					}
				},
				error: function() {
					self.$('.send-email-response').html('<div role="alert" class="alert alert-danger"><strong>Error!</strong> Internal server error!</div>');
				} 
			});
		},
		
		generatePdf : function() {
			var self = this;
			console.log(this.model);
			$.ajax({
				type: "POST",
				dataType: "json",
				url: 'api/pdf', 
				data: JSON.stringify({
					html: this.$('.result-container').html(),
					data: this.model,
				}), 
				success: function(result) {
					if (result.status == 'success') {
						self.model.save();
						self.$('.pdf-generating-response').html('<div role="alert" class="alert alert-success"><strong>Success! </strong> ' + result.data.message + '</div>');
						self.$('.btn-generate-pdf').toggle();
						self.$('.btn-download-pdf').toggle();
						self.$('.btn-download-pdf').html('Descarcă PDF');
						self.$('.btn-download-pdf').attr('href', 'api/pdf/' + result.data.filename);
					} else {
						self.$('.pdf-generating-response').html('<div role="alert" class="alert alert-danger"><strong>Error! </strong> ' + result.data.message + '</div>');
					}
				},
				error: function(result) {
					self.$('.pdf-generating-response').html('<div role="alert" class="alert alert-danger"><strong>Error!</strong> Internal server error!</div>');
				} 
			});
		}
	});
	 
	return ResultView;
});