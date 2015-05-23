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
			console.log(this.model);
		}
	});
	 
	return ResultView;
});