define([
  'jquery',
  'underscore',
  'backbone',
  'backbone.marionette',
  'modules/Utils',
  'text!templates/geolocation.html',
], function($, _, Backbone, Marionette, Utils, geolocationTpl){
	var GeolocationView = Backbone.Marionette.ItemView.extend({
		template : _.template(geolocationTpl),
		initialize : function(options) {
			var self = this;
			var Geo =  Backbone.Model.extend({});
			this.model = new Geo();
			this.model.set({
				pos: {coords: {longitude:null, latitude:null}},
				distances: [
				  	{point:'vox1', distance: null},
				  	{point:'vox2', distance: null},
			    ]
			});
			if ( navigator.geolocation ) {
				window.navigator.geolocation.getCurrentPosition(function(pos) {
				  self.model.set({
				  	pos: pos,
				  	distances: [
					  	{point:'vox1', distance: Utils.getDistance(pos.coords.longitude, pos.coords.latitude, 'vox1').toFixed(2)},
					  	{point:'vox2', distance: Utils.getDistance(pos.coords.longitude, pos.coords.latitude, 'vox2').toFixed(2)},
				    ]
				  });
				  self.render(); 
				});
			}
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
			
			this.$('#surface-single').surface({
				size: 240,
				components:[
					{label:'aplicabil', class:'top-left'},
				]
			});
			
			this.$('#surface-dual').surface({
				size: 240,
				components:[
					{label:'aplicabil', class:'top-left'},
					{label:'inspirational', class:'top-right'},
				]
			});
			
			this.$('#surface-tri').surface({
				size: 240,
				components:[
					{label:'aplicabil', class:'top'},
					{label:'inspirational', class:'bottom-left'},
					{label:'precis', class:'bottom-right'},
				]
			});
			
			this.$('#surface-quad').surface({
				size: 240,
				components:[
					{label:'aplicabil', class:'top-left'},
					{label:'inspirational', class:'top-right'},
					{label:'precis', class:'bottom-right'},
					{label:'interesant', class:'bottom-left'},
				]
			});
		}
	});
	 
	return GeolocationView;
});