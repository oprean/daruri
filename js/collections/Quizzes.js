define([
  'underscore',
  'backbone',
  'backbone.localStorage',
  'models/quiz'
], function(_, Backbone, LocalStorage, Quiz){
	var Quizzes = Backbone.Collection.extend({
	  model: Quiz,
	  localStorage: new LocalStorage("quizzes"), 
	});
	
	return Quizzes;
});