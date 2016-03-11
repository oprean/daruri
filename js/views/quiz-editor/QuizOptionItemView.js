define([
  'jquery',
  'underscore',
  'backbone',
  'backbone.marionette',
  'text!templates/quiz-editor/option-item.html',
], function($, _, Backbone, Marionette, itemTpl){
	var QuizOptionItemView = Backbone.Marionette.ItemView.extend({
		template : _.template(itemTpl),
		initialize : function(options) {
		},
		events : {
			'click .local-storage-clear' : 'localStorageClear'
		},
	});
	 
	return QuizOptionItemView;
});