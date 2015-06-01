define([
  'jquery',
  'underscore',
  'backbone',
  'backbone.marionette',
  'text!templates/result.html',
  'modules/Utils',
  'jspdf'
], function($, _, Backbone, Marionette, resultTpl, Utils, jsPDF){
	var ResultView = Backbone.Marionette.ItemView.extend({
		template : _.template(resultTpl),
		initialize : function(options) {
			Utils.generateResultStatistics(options.quizId);
			this.model = Utils.getResult(options.quizId);
			this.quiz = Utils.getQuiz(options.quizId);
		},
		events : {
			'click .btn-download' : 'download',
			'click .btn-email' : 'email',
			'click .score-item' : 'toggleDescription'
		},
		
		toggleDescription : function(e) {			
			this.$('.score-description').toggle();
		},
		
		email : function() {
			var self = this;
			$.post('php/mail.php', {mail: {
				name: this.$('#name').val(),
				email: this.$('#email').val(),
				subject: this.quiz.get('name') + ' results',
				body: this.$('.result-container').html()
			}}, function(data) {
				if (data == 'ok') {
					self.model.set('email', true);
					self.model.save();
					self.$('.form-email').html('<div role="alert" class="alert alert-success"><strong>Success!</strong> Mail succesfully sent to <i>'+ self.$('#email').val() +'</i>!</div>');
				} else {
					self.$('.form-email').prepend('<div role="alert" class="alert alert-danger"><strong>Error!</strong> Failed to send email!</div>');
				}
			})
		},
		
		download : function() {
			console.log(jsPDF);
			var doc = new jsPDF();
			//doc.fromHTML($('.result-container').get(0), 15, 15, {'width': 170});
			doc.text(20, 30, 'Darul iscusin&abreve;ei lucrului manual');						
			doc.save('gifts.pdf');
		}
	});
	 
	return ResultView;
});