define([
  'underscore',
  'backbone',
  'backbone.localStorage',
  'models/Result'
], function(_, Backbone, LocalStorage, Result){
	var Quizzes = Backbone.Collection.extend({
	  model: Result,
	  localStorage: new LocalStorage("quiz-result"), 
	});
	
	return Quizzes;
});