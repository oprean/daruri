define([
  'jquery',
  'underscore',
  'backbone',
], function($, _, Backbone){
	var Quiz = Backbone.Model.extend({
		defaults : {
			name: null,
			options: [],
			questions: null,
			results: null,
			logic: function() {}
		}
	});

	return Quiz;
});