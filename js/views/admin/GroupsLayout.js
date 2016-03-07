define([
  'jquery',
  'underscore',
  'backbone',
  'backbone.marionette',
  'models/Group',
  'collections/Groups',
'views/admin/GroupView',
  'views/admin/GroupMembersView',
  'text!templates/admin/groups-layout.html',
  'modules/Utils',
  'modules/Constants',
  'modules/Events',
], function($, _, Backbone, Marionette, Group, Groups, GroupView, GroupMembersView, groupsTpl, Utils, Constants, vent){
	var GroupsLayout = Backbone.Marionette.LayoutView.extend({
		template : _.template(groupsTpl),
		regions : {
			grid : '.grid',
			preview : '.preview',
			paginator : '.paginator'
		},
		
		initialize : function(options) {
			var self = this;
			this.groups = new Groups();
			this.groups.fetch({
				success: function(collection){
					self.initGroupsGrid(collection);
				}
			});
		},
		
		events : {
			'click .btn-add': 'addGroup'
		},
		
		addGroup : function() {
			this.model = new Group();
			var groupView = new GroupView({model:this.model});
			vent.trigger('showModal', groupView);
		},
		
		initGroupsGrid: function(groups) {
			var GroupRow = Backgrid.Row.extend({
			  events: {
			    click: 'view',
			  },
			  view: function() {
			    var groupMembersView = new GroupMembersView({model:this.model});
				vent.trigger('showModal', groupMembersView);
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
				
			Backgrid.UsersCell = Backgrid.Cell.extend({
			  className: "users-cell",			  
			  render : function() {
			  	this.$el.html(this.model.get('sharedUser').length);
			  	return this;
			  }			
			});
						
			var columns = [
			  {
			    name: "name",
			    label: "Name",
			    editable: false,
			    sortable: false,
			    cell: "string",
			  },
			  {
			    name: "description",
			    label: "Description",
			    editable: false,
			    sortable: false,
			    cell: "string",
			  },
			  {
			    name: "sharedUser",
			    label: "Users",
			    editable: false,
			    sortable: false,
			    cell: "users",
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
			  row: GroupRow,
			  columns: columns,
			  collection: groups,
			  emptyText: "A man without history is a tree without roots.",
			});
			this.showChildView('grid', this.backgridView);
		},
		
		templateHelpers : function() {
		},
		
	});
	 
	return GroupsLayout;
});