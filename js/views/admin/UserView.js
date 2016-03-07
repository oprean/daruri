define([
  'jquery',
  'underscore',
  'backbone',
  'modules/Constants',
  'text!templates/admin/user.html',
  'backbone.modal',
], function($, _, Backbone, Constants, userTpl){
	var UserView = Backbone.Modal.extend({
		template: _.template(userTpl),
		submitEl: '.btn-submit',
		cancelEl: '.btn-cancel',

		initialize : function() {
			var self = this;
						
			this.realModel = this.model;
			this.model = this.realModel.clone();
			console.log(this.model);			
		},
			
		onShow : function() {
			Backbone.Validation.bind(this);
		},

		fillModel : function(model) {
			model.set({
				username : $('#username').val(),
				password : $('#password').val(),
				email : $('#email').val(),
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

	return UserView;
});