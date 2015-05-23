define([
  'jquery',
  'underscore',
  'backbone',
], function($, _, Backbone){
	var Result = Backbone.Model.extend({
		defaults : {
			id:null,
			quiz_id: null,
			date: null,
			person: 'anonymous',
			answers: [],
			result: null
		}
	});

	return Result;
});