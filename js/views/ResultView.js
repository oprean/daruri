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
			'click .score-item' : 'toggleDescription'
		},
		
		toggleDescription : function(e) {			
			this.$('.score-description').toggle();
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