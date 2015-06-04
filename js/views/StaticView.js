define([
  'jquery',
  'underscore',
  'backbone',
  'backbone.marionette',
  'text!templates/static.html',
  'text!templates/contact.html',
  'text!templates/about.html',
], function($, _, Backbone, Marionette, staticTpl, contactTpl, aboutTpl){
	var StaticView = Backbone.Marionette.ItemView.extend({
		template : _.template(staticTpl),
		initialize : function(options) {
			var template;
			switch (options.tpl) {
				case 'about':
					template = _.template(aboutTpl);
					break;
				case 'contact':
					template = _.template(contactTpl);
					break;
				default:
					template = _.template(staticTpl);
			}
			this.template = template; 
			this.render();
		}
	});
	 
	return StaticView;
});