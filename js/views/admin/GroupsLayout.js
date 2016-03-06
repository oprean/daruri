define([
  'jquery',
  'underscore',
  'backbone',
  'backbone.marionette',
  'collections/Groups',
  'views/admin/GroupDetails',
  'text!templates/admin/groups-layout.html',
  'modules/Utils',
  'modules/Constants',
  'modules/Events',
], function($, _, Backbone, Marionette, Groups, GroupsDetailsView, groupsTpl, Utils, Constants, vent){
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
		
		initGroupsGrid: function(groups) {
			var GroupRow = Backgrid.Row.extend({
			  events: {
			    click: 'view',
			  },
			  view: function() {
			    var groupDetails = new GroupsDetailsView({model:this.model});
				vent.trigger('showModal', groupDetails);
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