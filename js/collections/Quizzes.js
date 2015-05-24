define([
  'underscore',
  'backbone',
  'backbone.localStorage',
  'models/Quiz'
], function(_, Backbone, LocalStorage, Quiz){
	var Quizzes = Backbone.Collection.extend({
	  model: Quiz,
	  localStorage: new LocalStorage("quiz-data"), 
	});
	
	return Quizzes;
});