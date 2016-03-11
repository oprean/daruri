define([
  'jquery',
  'underscore',
  'backbone',
  'backbone.marionette',
  'modules/Controller',
  'globals'
], function($, _, Backbone, Marionette, Controller, globals){
	var controller = new Controller();
	var Router = Marionette.AppRouter.extend({
	  
	  initialize: function() {
	  	if (globals.DEBUG_MODE == false) {
	    	return this.bind('route', this._trackPageview);	  		
	  	}
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
	    'admin(/:section)': 'admin',
	    'admin/quiz(/:id)/edit': 'quizEditor',
	    'static/:template': 'static',
	  	'quiz/:name/:q': 'quiz',
	  	'test/:feature': 'test'
	  }
	});
  return Router;
});