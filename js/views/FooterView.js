define([
  'jquery',
  'underscore',
  'backbone',
  'backbone.marionette',
  'text!templates/footer.html',
], function($, _, Backbone, Marionette, footerTpl){
	var FooterView = Backbone.Marionette.ItemView.extend({
		template : _.template(footerTpl),
	});
	 
	return FooterView;
});