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
			console.log(this.model);
		},
		events : {
			'click .btn-download' : 'download'
		},
		
		download : function() {
			console.log(jsPDF);
			var doc = new jsPDF();
			//doc.text(20, 20, 'Hello world.');
			doc.fromHTML($('.result-container').get(0), 15, 15, {'width': 170});			
			doc.save('gifts.pdf');
		}
	});
	 
	return ResultView;
});