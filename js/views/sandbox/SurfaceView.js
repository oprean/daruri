define([
  'jquery',
  'underscore',
  'backbone',
  'backbone.marionette',
  'modules/Utils',
  'text!templates/sandbox/surface.html',
  'jquery.ui.custom',
], function($, _, Backbone, Marionette, Utils, surfaceTpl){
	var SurfaceView = Backbone.Marionette.ItemView.extend({
		template : _.template(surfaceTpl),
		
		events: {
			'click .btn-values': 'getValues'
		},
		
		initialize : function(options) {
			_.delay(this.render, 0);
		},
		
		getValues: function(e) {
			this.$('.surface-values').html(this.$('#surface-quad').surface('values').join(','));
		},
		
		onRender: function() {				
			this.$('#surface-single').surface({
				size: 280,
				name: 'Mesajul',
				visible: {
					name:true,
					value:false,
					points:false
				},
				control: {
					size:20,
				},
				components:[
					{label:'aplicabil', class:'left'},
				]
			});
			
			this.$('#surface-dual').surface({
				size: 280,
				name: 'Mesajul',
				visible: {
					name:true,
					value:false,
					points:false
				},
				control: {
					size:20,
					color: '#3c986b'
				},
				components:[
					{label:'aplicabil', class:'top-left'},
					{label:'inspirational', class:'top-right'},
				]
			});
			
			this.$('#surface-tri').surface({
				size: 280,
				name: 'Mesajul',
				visible: {
					name:true,
					value:true,
					points:true
				},
				control: {
					size:30,
					color: '#c68841',
				},
				components:[
					{label:'aplicabil', class:'top'},
					{label:'inspirational', class:'bottom-left'},
					{label:'precis', class:'bottom-right'},
				]
			});
			
			this.$('#surface-quad').surface({
				size: 280,
				name: 'Mesajul',
				visible: {
					name:true,
					value:true,
					points:true
				},
				control: {
					size:50,
					color: '#763ca4',
					start: {left:50, top: 50}
				},
				components:[
					{label:'aplicabil', class:'top-left'},
					{label:'inspirational', class:'top-right'},
					{label:'precis', class:'bottom-right'},
					{label:'interesant', class:'bottom-left'},
				]
			});
		}
	});
	 
	return SurfaceView;
});