define([
  'jquery',
  'underscore',
  'backbone',
], function($, _, Backbone){
	var Answer = Backbone.Model.extend({
		defaults : {
			id: null,
			value: null,
			group_id: null
		}
	});

	return Answer;
});