define([
  'jquery',
  'underscore',
  'backbone',
  'backbone.marionette',
  'text!templates/header.html',
], function($, _, Backbone, Marionette, headerTpl){
	var HeaderView = Backbone.Marionette.ItemView.extend({
		template : _.template(HeaderTpl),
		
	});
	 
	return HeaderView;
});