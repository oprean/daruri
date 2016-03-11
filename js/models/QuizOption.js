define([
  'jquery',
  'underscore',
  'backbone',
], function($, _, Backbone){
	var QuizOption = Backbone.Model.extend({
		defaults : {
			id: null,
			value: null,
			ro_text: null,
			en_text: null,
		}
	});

	return QuizOption;
});