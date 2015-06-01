define([
  'jquery',
  'underscore',
  'backbone',
  'backbone.marionette',
  'text!templates/quiz-card.html',
  'modules/Utils',
  'modules/Constants',
], function($, _, Backbone, Marionette, quizCardTpl, Utils, Constants){
	var QuizCardView = Backbone.Marionette.CompositeView.extend({
		template : _.template(quizCardTpl),
		className: 'col-lg-4 col-md-4 col-sm-6 col-xs-12'
	});
	 
	return QuizCardView;
});