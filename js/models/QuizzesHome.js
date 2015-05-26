define([
  'jquery',
  'underscore',
  'backbone',
  'modules/Constants'
], function($, _, Backbone, Constants){
	var QuizzesHome = Backbone.Model.extend({
		initialize: function(options) {
			if (Constants.DEBUG == false) {
				options.quizzes = 
				options.quizzes.slice(0, options.quizzes.length-2); 
			}
			this.set(options);
		}
	});

	return QuizzesHome;
});