define([
  'underscore',
  'backbone',
  'models/Question'
], function(_, Backbone, Question){
	var Questions = Backbone.Collection.extend({
	  model: Question, 
	});
	
	return Questions;
});