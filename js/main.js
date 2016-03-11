require.config({
	urlArgs: new Date().getTime().toString(),
	"paths":{
		"jquery" : "lib/jquery-2.1.3.min",
 		"jquery.bootstrap": "lib/bootstrap.min",
 		
		"jquery.ui":"lib/jquery-ui.min",
		"jquery.ui.touch-punch":"lib/jquery.ui.touch-punch.min",
		"jquery.ui.custom":"lib/jquery-ui.custom",
		
		"underscore":"lib/lodash.min",
		
		"backbone":"lib/backbone-min",
		"backbone.marionette":"lib/backbone.marionette.min",
		"backbone.localStorage":"lib/backbone.localStorage.min",
		"backbone.validation":"lib/backbone-validation-min",	
		
		"backbone.modal" : "lib/backbone.modal",
		"backbone.marionette.modals" : "lib/backbone.marionette.modals",
			
		"backgrid" : "lib/backgrid.min",
		
		"moment":"lib/moment.min",
		"jquery.qrcode":"lib/jquery.qrcode-0.12.0.min",
		
		"text":"lib/text",
		"i18n":"lib/i18n",
		"polyglot":"lib/polyglot.min",
	},
	
	"shim":{
		"jquery.ui": {
			"deps": ["jquery"]
		},
		"jquery.bootstrap": {
			"deps": ["jquery.ui"]
		},
		"jquery.ui.touch-punch": {
			"deps": ["jquery.ui"]
		},
		"jquery.ui.custom": {
			"deps": ["jquery.ui.touch-punch"]
		},
		"jquery.qrcode": {
			"deps": ["jquery"]
		},
		"backbone":{
			"deps":["jquery","underscore"],
			"exports":"Backbone"
		},
		"backbone.marionette":{
			"deps":["jquery","underscore","backbone"],
			"exports":"Marionette"
		},
		"backbone.localStorage":{
			"deps":["backbone"],
			"exports":"Backbone"
		},
		"backbone.validation":{
			"deps":["backbone"],
			"exports":"Backbone"
		},
		"backgrid":{
			"deps":["jquery", "underscore", "backbone"],
			"exports": "Backgrid"
		}
	}
});

require([ 
  'infrastructure', 
], function () { 
	require([ 
	  'app',
	  'modules/Router',
	  'i18n!nls/labels',
	], function ( App, Router, translations ) {
		app = new App();
		app.router = new Router();
		app.locale = window.navigator.userLanguage || window.navigator.language;
		console.log('lang: ' + app.locale);
		console.log(translations);
		window.polyglot = new Polyglot({phrases: translations});
		if( ! Backbone.History.started) Backbone.history.start();
		app.start(); 
	}); 
});