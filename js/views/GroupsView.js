define([
  'jquery',
  'underscore',
  'backbone',
  'backbone.marionette',
  'text!templates/groups.html',
  'modules/Utils',
], function($, _, Backbone, Marionette, groupsTpl, Utils){
	var GroupsView = Backbone.Marionette.ItemView.extend({
		template : _.template(groupsTpl),
		initialize : function(options) {
			this.model = Utils.getQuiz(options.quizId);
		},
		
		templateHelpers: function() {
			return {
				gifts : this.model.get('groups')
			}
		}
	});
	 
	return GroupsView;
});