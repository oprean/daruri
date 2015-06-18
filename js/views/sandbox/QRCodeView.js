define([
  'jquery',
  'underscore',
  'backbone',
  'backbone.marionette',
  'modules/Utils',
  'text!templates/sandbox/qrcode.html',
  'jquery.qrcode',
], function($, _, Backbone, Marionette, Utils, qrcodeTpl){
	var QRCodeView = Backbone.Marionette.ItemView.extend({
		template : _.template(qrcodeTpl),
				
		initialize : function(options) {
		},
		
		onRender: function() {
			this.$('.qrcode-container').qrcode({
				size:300,
				radius:50,
				text: 'http://oprean.ddns.net/quizzes/',
				//mode: 2,
				label: 'Vox Domini',
				fontcolor: '#ff9818'
			});
		}
	});
	 
	return QRCodeView;
});