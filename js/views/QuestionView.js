define([
  'jquery',
  'underscore',
  'backbone',
  'backbone.marionette',
  'text!templates/question.html',
], function($, _, Backbone, Marionette, questionTpl){
	var QuestionView = Backbone.Marionette.ItemView.extend({
		template : _.template(questionTpl),
	});
	 
	return QuestionView;
});