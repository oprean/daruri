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
			
			this.listenTo(vent, 'admin.users.grid.refresh', function(){
				self.users.fetch({
					success: function(collection){
						self.initUsersGrid(collection);
					}
				});
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
			var self = this;
			var UserRow = Backgrid.Row.extend({
			  events: {
			    //click: 'preview',
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
			  	'click .del-user' : 'delete',
			  	'click .edit-user' : 'edit'
			  },
			  
			  delete : function() {
				if (confirm('Are you sure?')) {
			  		this.model.destroy();					
				}
			  },
			  	  
			  edit : function() {
				var userView = new UserView({model:this.model});
				vent.trigger('showModal', userView);
			  },
			  
			  render : function() {
			  	this.$el.html(
			  		'<div class="text-center">'+
			  		' <button type="button" title="Edit group" class="edit-user btn btn-xs btn-success"><span class="glyphicon glyphicon-pencil" aria-hidden="true"></span></button>'+
					' <button type="button" title="Delete group" class="del-user btn btn-xs btn-danger"><span class="glyphicon glyphicon-trash" aria-hidden="true"></span></button> '+
			  		'</div>'
			  		);
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
			  {
			    name: "actions",
			    label: "",
			    editable: false,
			    sortable: false,
			    cell: "actions",
			  },
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