define([
  'jquery',
  'underscore',
  'backbone',
  'modules/Constants',
  'text!templates/admin/quiz-preview.html',
  'modules/Events',
  'backbone.modal',
], function($, _, Backbone, Constants, quizTpl, vent){
	var GroupView = Backbone.Modal.extend({
		template: _.template(quizTpl),
		submitEl: '.btn-submit',
		cancelEl: '.btn-cancel',

		initialize : function() {
			var self = this;		
			this.realModel = this.model;
			this.model = this.realModel.clone();		
		},
		
		onShow : function() {
			Backbone.Validation.bind(this);
		},

		fillModel : function(model) {
			model.set({
				name : $('#name').val(),
				description : $('#description').val(),
			});
		},
		
		beforeSubmit : function() {
			this.fillModel(this.model);
			return this.model.isValid(true);
		},
		
		submit: function() {
			this.fillModel(this.realModel);
			this.model.save(null, {
				success: function(model) {
					vent.trigger('admin.groups.grid.refresh');					
				},
			});
		}				
	});

	return GroupView;
});