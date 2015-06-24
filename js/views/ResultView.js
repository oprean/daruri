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
			'click .btn-send-email' : 'sendEmail',
			'click .btn-share' : 'shareResult',
			'click .score-item' : 'toggleDescription'
		},
		
		toggleDescription : function(e) {			
			this.$('.score-description').toggle();
		},
		
		validate : function() {
			return this.$('#name').val() && this.$('#email').val();
		},
		
		shareResult: function() {
			var self = this;
			FB.login(function(){
			  FB.api('/me/feed', 'post', {
			  	subject: 'title',
			  	message: self.$('.result-container h1').text(),
			  	//prepare a PHP link with the result 
			 	link: 'http://oprean.ddns.net/quizzes/#' + self.model.get('quiz_id') + '/home',
			 	//picture: 'http://oprean.ddns.net/quizzes/assets/img/logo.png'
			  });
			}, {scope: 'publish_actions'});
		},
		
		sendEmail : function() {
			var self = this;
			
			if (!this.validate()) {
				self.$('.send-email-response').html('<div role="alert" class="alert alert-danger"><strong>Error! </strong> Name or/and Email can not be empty!</div>');
				return;
			};
			
			this.$('.btn-send-email').button('loading');
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
				},
				complete: function() {
					self.$('.btn-send-email').button('reset');					
				} 
			});
		},
		
		generatePdf : function() {
			var self = this;
			console.log(this.model);
			this.$('.btn-generate-pdf').button('loading');
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
				},
				complete: function() {
					self.$('.btn-generate-pdf').button('reset');					
				}
			});
		}
	});
	 
	return ResultView;
});