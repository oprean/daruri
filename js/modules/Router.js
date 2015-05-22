define([
  'jquery',
  'underscore',
  'backbone',
  'backbone.marionette',
  'modules/Controller',
], function($, _, Backbone, Marionette, Controller){
	var controller = new Controller();
	var Router = Marionette.AppRouter.extend({
	  controller: controller,
	  appRoutes: {
	    '': 'home',
	  	'about': 'about',
	    'home': 'home',
	  	'quiz/:name/:q': 'quiz',
	  }
	});
  return Router;
});