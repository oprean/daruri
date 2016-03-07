define([
  'jquery',
  'underscore',
  'backbone',
  'backbone.marionette',
  'views/admin/UsersLayout',
  'views/admin/GroupsLayout',
  'text!templates/admin/main-layout.html',
  'modules/Constants',
  'modules/Utils'
], function($, _, Backbone, Marionette, UsersLayout, GroupsLayout, adminLayoutTpl, Constants, Utils){
  var AdminLayout = Backbone.Marionette.LayoutView.extend({
	template : _.template(adminLayoutTpl),
	regions : {
//		menu : '.admin-menu-container',
		main : '.admin-main-container',
	},
	
	events : {
	},
	
	initialize : function(options) {
		switch(options.section) {
			case 'users':
				this.mainView = new UsersLayout();			
				break;
			case 'groups':
				this.mainView = new GroupsLayout();			
				break;
			default:
				this.mainView = new UsersLayout();
				break;
		}			
	},
	
	/*onRender: function () {
		console.log('onRender');
		// Get rid of that pesky wrapping-div.
		// Assumes 1 child element present in template.
		this.$el = this.$el.children();
		// Unwrap the element to prevent infinitely 
		// nesting elements during re-render.
		this.$el.unwrap();
		this.setElement(this.$el);
	},*/

	onBeforeShow : function() {
		this.showChildView('main', this.mainView);
	},
  });

  return AdminLayout;
});