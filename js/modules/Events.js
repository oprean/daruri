define([
  'jquery',
  'underscore',
  'backbone',
  'backbone.marionette',
], function($, _, Backbone, Marionette){
	 return new Backbone.Wreqr.EventAggregator();
});