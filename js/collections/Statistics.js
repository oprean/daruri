define([
  'underscore',
  'backbone',
  'models/Score'
], function(_, Backbone, Score){
	var Statistics = Backbone.Collection.extend({
	  model: Score,
	  
	  comparator: function(m) {
	  	return -parseInt(m.get('value'));
	  } 
	});
	
	return Statistics;
});