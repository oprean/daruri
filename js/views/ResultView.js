define([
  'jquery',
  'underscore',
  'backbone',
  'backbone.marionette',
  'text!templates/result.html',
], function($, _, Backbone, Marionette, resultTpl){
	var ResultView = Backbone.Marionette.ItemView.extend({
		template : _.template(resultTpl),
	});
	 
	return ResultView;
});