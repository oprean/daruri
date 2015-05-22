define([
  'jquery',
  'underscore',
  'backbone',
], function($, _, Backbone){
	var Question = Backbone.Model.extend({
		defaults : {
			text: null,
			options: [],
		}
	});

	return Question;
});