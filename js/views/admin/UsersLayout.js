define([
  'jquery',
  'underscore',
  'backbone',
  'backbone.marionette',
  'collections/Users',
  'views/admin/UserDetails',
  'text!templates/admin/users-layout.html',
  'modules/Utils',
  'modules/Constants',
], function($, _, Backbone, Marionette, Users, UserDetails, usersTpl, Utils, Constants){
	var UsersLayout = Backbone.Marionette.LayoutView.extend({
		template : _.template(usersTpl),
		regions : {
			grid : '.grid',
			preview : '.preview',
			paginator : '.paginator'
		},
		
		initialize : function(options) {
			var self = this;
			this.users = new Users();
			this.users.fetch({
				success: function(collection){
					self.initUsersGrid(collection);
				}
			});
		},
		
		initUsersGrid: function(users) {
			var UserRow = Backgrid.Row.extend({
			  events: {
			    click: 'preview',
			  },
			  preview: function() {
			    var userDetails = new UserDetails({model:this.model});
			    self.showChildView('preview', userDetails);
			    vent.trigger('product.selected', this.model);
			  }
			});
		
			Backgrid.ActionsCell = Backgrid.Cell.extend({
			  className: "actions-cell",
			  events : {
			  	'click .del' : 'delete'
			  },
			  
			  delete : function() {
			  	this.model.destroy();
			  },
			  
			  render : function() {
			  	this.$el.html('<button type="button" title="Delete item" class="del icon-btn pull-right"><span class="glyphicon glyphicon-trash" aria-hidden="true"></span></button>');
			  	return this;
			  }			
			});
						
			var columns = [
			  {
			    name: "username",
			    label: "Name",
			    editable: false,
			    sortable: false,
			    cell: "string",
			  },
			  {
			    name: "email",
			    label: "E-Mail",
			    editable: false,
			    sortable: false,
			    cell: "string",
			  },
			  /*{
			    name: "actions",
			    label: "",
			    editable: false,
			    sortable: false,
			    cell: "actions",
			  },*/
			];
			
			this.backgridView = new Backgrid.Grid({
			  className: 'backgrid items table table-striped table-bordered table-hover table-condensed',
			  row: UserRow,
			  columns: columns,
			  collection: users,
			  emptyText: "A man without history is a tree without roots.",
			});
			this.showChildView('grid', this.backgridView);
		},
		
		templateHelpers : function() {
		},
		
	});
	 
	return UsersLayout;
});