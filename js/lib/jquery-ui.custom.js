(function( factory ) {
	if ( typeof define === "function" && define.amd ) {

		// AMD. Register as an anonymous module.
		define([ "jquery" ], factory );
	} else {
		// Browser globals
		factory( jQuery );
	}
}(function( $ ) {

$.widget("ui.surface", {
	options: {
		size: 200,
		name: 'surface',
		control: {
			size: 20,
			start: null,
			color: '#275d74'	
		},

		components:[
			{label:'component1', class:'top-left'},
			{label:'component2', class:'top-right'},
			{label:'component3', class:'bottom-right'},
			{label:'component4', class:'bottom-left'},
		]
	},
	
	_create: function() {
		this._surface = $("<div>");
		var self = this;
		this.values = [];
		$.each(this.options.components, function( i, component ) {
			self._surface.append(
			'<div class="'+ component.class +'">'+ component.label +'</div>\n '
  			);
		});
		
		this.controlHeight = this.getControlHeight();

		if (this.options.control.start == null) {
			this.options.control.start = {
				left: (this.options.size/2) - (this.options.control.size/2),
				top: (this.controlHeight/2) - (this.options.control.size/2),
			}; 
		};

		this.max = this.getMaxRawValue();

		this._surface.append('<div class="control-point" style="' + 
				'top:'+	this.options.control.start.top +'px;' + 
				'left:'+ this.options.control.start.left +'px;' +
				'width:'+ this.options.control.size +'px;' + 
				'height:'+ this.options.control.size +'px;' +
				'background:'+ this.options.control.color +';' +
			'"></div>');

		$(this.element).append(this._surface); 
		$(this.element).css('width', this.options.size);
		$(this.element).css('height', this.controlHeight);		
		$(this.element).css('border-radius', this.options.control.size/2);
		$(this.element).addClass('select-surface-control');

		$( '#'+$(this.element).attr('id') + " .control-point" ).draggable({
			containment: '#'+$(this.element).attr('id'),
			scroll: false, 
			stop: function(event, ui) {
				self.values = self.getValues(ui.position);
				console.log(self.values);
			},
      });
	},
	
	getControlHeight: function() {
		switch(this.options.components.length) {
			case 1:
			case 2: return this.options.control.size;
			case 3: return this.options.size*Math.sqrt(3)/2;
			case 4: return this.options.size;
		}
	},
	
	getValues: function(position) {
		var values = [];
		var self = this;
		switch(this.options.components.length) {
			case 1: 
				values.push(position.left);
				break;
			case 2: 
				values.push(this.distance({top:0, left:0}, position));
				values.push(this.distance({top:0, left:this.options.size}, position));
				break;
			case 3: 
				values.push(this.distance({top:0, left:this.options.size/2}, position));
				values.push(this.distance({top:this.controlHeight, left:this.options.size}, position));
				values.push(this.distance({top:this.controlHeight, left:0}, position));
				break;
			case 4: 
				values.push(this.distance({top:0, left:0}, position));
				values.push(this.distance({top:0, left:this.options.size}, position));
				values.push(this.distance({top:this.options.size, left:this.options.size}, position));
				values.push(this.distance({top:this.options.size, left:0}, position));
				break;
		}	
		values = _.map(values, function(value){ return (value*100/self.max).toFixed(0); });
		
		return values;
	},
	
	getMaxRawValue: function() {
		return (this.options.components.length < 4)
			?this.options.size
			:Math.sqrt( this.options.size*this.options.size * 2);
	},
	
	distance: function(p1, p2) {
		return Math.sqrt((p2.left -p1.left)*(p2.left -p1.left) + (p2.top-p1.top)*(p2.top-p1.top));
	},
	
	//http://www.geeksforgeeks.org/check-whether-a-given-point-lies-inside-a-triangle-or-not/
	
	_setOption: function(option, value) {
		$.Widget.prototype._setOption.apply( this, arguments );
	}
});

}));