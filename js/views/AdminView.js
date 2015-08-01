define([
  'jquery',
  'underscore',
  'backbone',
  'backbone.marionette',
  'text!templates/admin.html',
  'modules/Utils',
  'modules/Constants',
], function($, _, Backbone, Marionette, adminTpl, Utils, Constants){
	var AdminView = Backbone.Marionette.ItemView.extend({
		template : _.template(adminTpl),
		initialize : function(options) {
		},
		
		templateHelpers : function() {
		},
		
	});
	 
	return AdminView;
});