require.config({
	urlArgs: new Date().getTime().toString(),
	"paths":{
		"jquery" : "lib/jquery-2.1.3.min",
 		"jquery.bootstrap": "lib/bootstrap.min",
		"underscore":"lib/lodash.min",
		
		"backbone":"lib/backbone-min",
		"backbone.marionette":"lib/backbone.marionette.min",
		"backbone.localStorage":"lib/backbone.localStorage.min",
		"backbone.validation":"lib/backbone-validation-min",		
		
		"moment":"lib/moment.min",

		"text":"lib/text",
		"i18n":"lib/i18n",
		"polyglot":"lib/polyglot.min",
		
		"parse" : "lib/parse-1.4.0.min",
	},
	
	"shim":{
		"jquery.bootstrap": {
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
	}
});

require([
  'jquery',
  'underscore',
  'backbone',
  'backbone.marionette',
  'modules/Router',
  'modules/Utils',
  'views/HeaderView',
  'views/FooterView',
  'jquery.bootstrap',
  'polyglot',
  'parse',
    ], function ($, _, Backbone, Marionette, Router, Utils, HeaderView, FooterView) {    
        window.app = new Backbone.Marionette.Application();
		app.addRegions({
			headerRegion : "#header-container",
			mainRegion: "#main-container",
			footerRegion: "#footer-container",
		});
			
		app.addInitializer(function(){
			app.locale = window.navigator.userLanguage || window.navigator.language;
			app.env = Utils.bootstrapEnv();
			console.log('lang: ' + app.locale + 'env: ' + app.env);
			Parse.initialize(Constants.parse.AppID, Constants.parse.JsKey);
			window.polyglot = new Polyglot({phrases: translations});
			app.router = new Router();
			if( ! Backbone.History.started) Backbone.history.start();
			app.headerRegion.show(new HeaderView());
			app.footerRegion.show(new FooterView());
		});
		
		app.start();
   });