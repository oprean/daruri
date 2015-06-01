define([
  'underscore',
  'backbone',
  'models/QuizCard'
], function(_, Backbone, QuizCard){
	var QuizzesCards = Backbone.Collection.extend({
	  model: QuizCard, 
	});
	
	return QuizzesCards;
});