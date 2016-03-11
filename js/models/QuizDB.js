define([
  'jquery',
  'underscore',
  'backbone',
], function($, _, Backbone){
	var QuizDB = Backbone.Model.extend({
		urlRoot: 'api/quiz', 
		defaults : {
			id: null,
			name: null,
			description: null,
			type: null,
			data: null,
			active: null,
			created: null,
			modified: null
		}
	});

	return QuizDB;
});