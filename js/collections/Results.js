define([
  'underscore',
  'backbone',
  'backbone.localStorage',
  'models/quiz'
], function(_, Backbone, LocalStorage, Quiz){
	var Quizzes = Backbone.Collection.extend({
	  model: Result,
	  localStorage: new LocalStorage("results"), 
	});
	
	return Quizzes;
});