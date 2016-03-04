define([
	'jquery',
	'underscore',
	'backbone',
	'backbone.marionette',
	'modules/Utils',
	'models/QuizzesHome',
	'modules/Constants',
	'views/HeaderView',
	'views/FooterView',
], function( $, _, Backbone, Marionette, Utils, QuizzesHome, Constants, HeaderView, FooterView) {
	var App = Backbone.Marionette.Application.extend({
		initialize: function() {
			$.ajaxSetup({cache: false});
			this.env = Utils.bootstrapEnv();
			this.quizzes = new QuizzesHome(Utils.getJson('quizzes'));
			this.addRegions({
				headerRegion : "#header-container",
				mainRegion: "#main-container",
				footerRegion: "#footer-container",
			});

			//this.headerRegion.show(new HeaderView({quizzes: this.quizzes}));
			this.footerRegion.show(new FooterView());
		}
	});
	
	return App;
});