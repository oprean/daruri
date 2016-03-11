define([
  'jquery',
  'underscore',
  'backbone',
  'models/QuizOption'
], function($, _, Backbone, QuizOption){
  var QuizOptions = Backbone.Collection.extend({
  	model: QuizOption,
  });

  return QuizOptions;
});