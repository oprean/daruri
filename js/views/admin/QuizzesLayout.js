define([
  'jquery',
  'underscore',
  'backbone',
  'backbone.marionette',
  'models/QuizDB',
  'collections/QuizzesDB',
  'views/admin/QuizView',
  'views/admin/QuizPreview',
  'text!templates/admin/quizzes-layout.html',
  'modules/Utils',
  'modules/Constants',
  'modules/Events',
], function($, _, Backbone, Marionette, Quiz, Quizzes, QuizView, QuizPreview, quizzesTpl, Utils, Constants, vent){
	var QuizzesLayout = Backbone.Marionette.LayoutView.extend({
		template : _.template(quizzesTpl),
		regions : {
			grid : '.grid',
			preview : '.preview',
			paginator : '.paginator'
		},
		
		initialize : function(options) {
			var self = this;
			this.quizzes = new Quizzes();
			this.quizzes.fetch({
				success: function(collection){
					self.initQuizzesGrid(collection);
				}
			});
			
			this.listenTo(vent, 'admin.quizzes.grid.refresh', function(){
				self.quizzes.fetch({
					success: function(collection){
						self.initQuizzesGrid(collection);
					}
				});
			});
		},
		
		events : {
			'click .btn-add': 'addQuiz'
		},
		
		addQuiz : function() {
			this.model = new Quiz();
			var quizView = new QuizView({model:this.model});
			vent.trigger('showModal', quizView);
		},
		
		initQuizzesGrid: function(quizzes) {
			var self = this;
			var QuizRow = Backgrid.Row.extend({
			  events: {
			    //click: 'preview',
			  },
			  preview: function() {
			    var userView = new UserView({model:this.model});
			    self.showChildView('preview', userView);
			  }
			});
		
			Backgrid.ActionsCell = Backgrid.Cell.extend({
			  className: "actions-cell",
			  events : {
			  	'click .del-quiz' : 'delete',
			  	'click .edit-quiz' : 'edit',
			  	'click .preview-quiz' : 'preview'
			  },
			  
			  delete : function() {
				if (confirm('Are you sure?')) {
			  		this.model.destroy();					
				}
			  },
			  	  
			  edit : function() {
				var userView = new QuizView({model:this.model});
				vent.trigger('showModal', userView);
			  },
			  
			  preview : function() {
				var quizPreview = new QuizPreview({model:this.model});
				vent.trigger('showModal', quizPreview);
			  },
			  
			  render : function() {
			  	this.$el.html(
			  		'<div class="text-center">'+
			  		' <button type="button" title="Preview quiz" class="preview-quiz btn btn-xs btn-primary"><span class="glyphicon glyphicon-eye-open" aria-hidden="true"></span></button>'+
			  		' <button type="button" title="Edit quiz" class="edit-quiz btn btn-xs btn-success"><span class="glyphicon glyphicon-pencil" aria-hidden="true"></span></button>'+
			  		//' <a href="#admin/quiz/'+this.model.id+'/edit" title="Edit quiz" class="btn btn-xs btn-default"><span class="glyphicon glyphicon-pencil" aria-hidden="true"></span></a>'+
					' <button type="button" title="Delete quiz" class="del-quiz btn btn-xs btn-danger"><span class="glyphicon glyphicon-trash" aria-hidden="true"></span></button> '+
			  		'</div>'
			  		);
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
			    name: "type",
			    label: "Type",
			    editable: false,
			    sortable: false,
			    cell: "string",
			  },
			  {
			    name: "active",
			    label: "Active",
			    editable: false,
			    sortable: false,
			    cell: "boolean",
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
			  row: QuizRow,
			  columns: columns,
			  collection: quizzes,
			  emptyText: "A man without history is a tree without roots.",
			});
			this.showChildView('grid', this.backgridView);
		},
		
		templateHelpers : function() {
		},
		
	});
	 
	return QuizzesLayout;
});