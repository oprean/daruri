define([
  'jquery',
  'underscore',
  'backbone',
  'backbone.marionette',
  'text!templates/about.html',
], function($, _, Backbone, Marionette, aboutTpl){
	var AboutView = Backbone.Marionette.ItemView.extend({
		template : _.template(aboutTpl),
	});
	 
	return AboutView;
});