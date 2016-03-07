define([
  'jquery',
  'underscore',
  'backbone',
  'backbone.marionette',
  'models/User',
  'collections/Users',
  'views/admin/UserView',
  'text!templates/admin/users-layout.html',
  'modules/Utils',
  'modules/Constants',
  'modules/Events',
], function($, _, Backbone, Marionette, User, Users, UserView, usersTpl, Utils, Constants, vent){
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
		
		events : {
			'click .btn-add': 'addUser'
		},
		
		addUser : function() {
			this.model = new User();
			var userView = new UserView({model:this.model});
			vent.trigger('showModal', userView);
		},
		
		initUsersGrid: function(users) {
			var UserRow = Backgrid.Row.extend({
			  events: {
			    click: 'preview',
			  },
			  preview: function() {
			    var userView = new UserView({model:this.model});
			    self.showChildView('preview', userView);
			    vent.trigger('product.selected', this.model);
			  }
			});
		
			Backgrid.GroupsCell = Backgrid.Cell.extend({
			  className: "groups-cell",			  
			  render : function() {
			  	var names = new Array;
			  	_.each(this.model.get('sharedGroup'), function(group){
			  		names.push(group.name);
			  	});
			  	this.$el.html(names.join(','));
			  	return this;
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
			  {
			    name: "sharedGroup",
			    label: "Member of",
			    editable: false,
			    sortable: false,
			    cell: "groups",
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