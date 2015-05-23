define([
  'jquery',
  'underscore',
  'backbone',
], function($, _, Backbone){
	var Question = Backbone.Model.extend({
		defaults : {
			quiz_id: null,
			text: null,
			options: null,
			group_id: null
		}
	});

	return Question;
});