define([
  'jquery',
  'underscore',
  'backbone',
  'models/QuizDB'
], function($, _, Backbone, QuizDB){
  var QuizzesDB = Backbone.Collection.extend({
  	url: 'api/quiz', 
  	model: QuizDB,
  });

  return QuizzesDB;
});