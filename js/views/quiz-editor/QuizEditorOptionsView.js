define([
  'jquery',
  'underscore',
  'backbone',
  'backbone.marionette',
  'collections/QuizOptions',
  'views/quiz-editor/QuizOptionItemView',
  'text!templates/quiz-editor/options.html',
], function($, _, Backbone, Marionette, QuizQuestions, QuizOptionItemView, optionsTpl){
	var QuizEditorOptionsView = Backbone.Marionette.CompositeView.extend({
		template : _.template(optionsTpl),
		childViewContainer: '.options-list',
		childView: QuizOptionItemView,
		
		events : {
		},

		initialize : function(options) {
			console.log(options.quizOptions);
			this.collection = new QuizQuestions(options.quizOptions);
		},
		
	});
	 
	return QuizEditorOptionsView;
});