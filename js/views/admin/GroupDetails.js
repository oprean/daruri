define([
  'jquery',
  'underscore',
  'backbone',
  'modules/Constants',
  'text!templates/admin/group.html',
  'backbone.modal',
], function($, _, Backbone, Constants, groupTpl){
	var GroupDetailsView = Backbone.Modal.extend({
		template: _.template(groupTpl),
		submitEl: '.btn-submit',
		cancelEl: '.btn-cancel',

		initialize : function() {
			this.realModel = this.model;
			this.model = this.realModel.clone();
			console.log(this.model);
		},
		
		templateHelpers : function() {
			return {
				//woodTypes : Constants.woodTypes 
			};
		},
		
		onShow : function() {
			Backbone.Validation.bind(this);
		},

		fillModel : function(model) {
			model.set({
				wood : $('#wood').val(),
				image : $('#image').val(),
				title : $('#title').val(),
				width : $('#width').val(),
				height : $('#height').val(),
			});
		},
		
		beforeSubmit : function() {
			this.fillModel(this.model);
			return this.model.isValid(true);
		},
		
		submit: function() {
			this.fillModel(this.realModel);
		}				
	});

	return GroupDetailsView;
});