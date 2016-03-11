define([
  'jquery',
  'underscore',
  'backbone',
  'backbone.marionette',
  'models/QuizDB',
  'views/quiz-editor/QuizEditorOptionsView',
  //'views/quiz-editor/QuizEditorGroupsView',
  //'views/quiz-editor/QuizEditorQuestionsView',
  'text!templates/quiz-editor/quiz-editor-layout.html',
  'modules/Utils',
  'modules/Constants',
  'modules/Events',
], function($, _, Backbone, Marionette, QuizDB, QuizEditorOptionsView, 
	//QuizEditorGroupsView, QuizEditorQuestionsView, 
	quizEditorTpl, Utils, Constants, vent){
	var QuizEditorLayout = Backbone.Marionette.LayoutView.extend({
		template : _.template(quizEditorTpl),
		regions : {
			qOptions : '.options-container',
			qGroups : '.groups-container',
			qQuestions : '.questions-container',
		},
		
		initialize : function(options) {
			var self = this;
			this.model = new QuizDB({id:options.quizId});
			this.model.fetch({
				success: function(model){
					self.initQuizLayout(model);
				}
			});
			
			this.listenTo(vent, 'admin.quiz.edit.refresh', function(){
				self.model.fetch({
					success: function(collection){
						self.initQuizLayout(collection);
					}
				});
			});
		},
		
		events : {
		},
			
		initQuizLayout: function(quiz) {
			var quizData = JSON.parse(quiz.get('data'));
			this.optionsView = new QuizEditorOptionsView({quizOptions:quizData.options});
			//this.groupsView = new QuizEditorGroupsView({quizGroups:quizData.groups});
			//this.questionsView = new QuizEditorQuestionsView({quizQuestions:quizData.questions});
			
			this.showChildView('qOptions', this.optionsView);
			//this.showChildView('groups-container', this.groupsView);
			//this.showChildView('questions-container', this.questionsView);
			
		},
		
		templateHelpers : function() {
		},
		
	});
	 
	return QuizEditorLayout;
});