define([
  'jquery',
  'underscore',
  'backbone',
  'backbone.marionette',
  'modules/Controller',
], function($, _, Backbone, Marionette, Controller){
	var controller = new Controller();
	var Router = Marionette.AppRouter.extend({
	  
	  initialize: function() {
	    return this.bind('route', this._trackPageview);
	  },
	  _trackPageview: function() {
	    var url;
	    url = Backbone.history.getFragment();
	    return ga('send', 'pageview', '/' + url);
	  },
	  
	  controller: controller,
	  appRoutes: {
	    '': 'home',
	    'home': 'home',
	    'static/:template': 'static',
	  	'quiz/:name/:q': 'quiz',
	  	'test/:feature': 'test'
	  }
	});
  return Router;
});