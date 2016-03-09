define([
  'jquery',
  'underscore',
  'backbone',
  'modules/Constants',
  'text!templates/admin/user.html',
  'modules/Events',
  'backbone.modal',
], function($, _, Backbone, Constants, userTpl, vent){
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
				is_admin : $('#is_admin').is(":checked"),
			});
		},
		
		beforeSubmit : function() {
			this.fillModel(this.model);
			return this.model.isValid(true);
		},
		
		submit: function() {
			this.fillModel(this.realModel);
			console.log('submit');
			this.model.save(null, {
				success: function(model) {
					vent.trigger('admin.users.grid.refresh');					
				},
			});
		}				
	});

	return UserView;
});