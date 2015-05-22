define([
  'jquery',
  'underscore',
  'backbone',
], function($, _, Backbone){
	var Result = Backbone.Model.extend({
		defaults : {
			person: 'anonymous',
			answers: [],
			result: ''
		}
	});

	return Result;
});