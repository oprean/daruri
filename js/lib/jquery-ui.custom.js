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
		width: 200,
		height:200,
		name: 'surface',
		control: {
			size: 20,
			start: null,
			color: '#275d74'	
		},

		axis:[
			{label:'axis1', class:'top-left'},
			{label:'axis2', class:'top-right'},
			{label:'axis3', class:'bottom-right'},
			{label:'axis4', class:'bottom-left'},
		]
	},
	
	_create: function() {
		this._surface = $("<div>");
		var self = this;
		this.values = [];
		$.each(this.options.axis, function( i, axis ) {
			self._surface.append(
			'<div class="'+ axis.class +'">'+ axis.label +'</div>\n '
  			);
		});
		
		if (this.options.control.start == null) {
			this.options.control.start = {
				top: (this.options.height/2) - (this.options.control.size/2), 
				left: (this.options.width/2) - (this.options.control.size/2),
			}; 
		};
		this.max = Math.sqrt(
			this.options.height*this.options.height + 
			this.options.width*this.options.width
		);
		this._surface.append('<div class="control-point" style="' + 
				'top:'+	this.options.control.start.top +'px;' + 
				'left:'+ this.options.control.start.left +'px;' +
				'width:'+ this.options.control.size +'px;' + 
				'height:'+ this.options.control.size +'px;' +
				'background:'+ this.options.control.color +';' +
			'"></div>');
			
		$(this.element).append(this._surface); 
		$(this.element).css('width', this.options.width);
		$(this.element).css('height', this.options.height);
		$(this.element).addClass('select-surface-control');
		/*$( ".select-surface-control" ).click(function(e){
			var posX = $(this).offset().left, 
				posY = $(this).offset().top;
			console.log((e.pageX - posX)+ ' , ' + (e.pageY - posY));
			$( ".control-point" ).css('left', e.pageX - posX);
			$( ".control-point" ).css('top', e.pageY - posY);
		});*/
		$( ".control-point" ).draggable({ 
			containment: ".select-surface-control", 
			scroll: false, 
			stop: function(event, ui) {
				this.values = [];
				this.values.push(self.distance({top:0, left:0}, ui.position));
				this.values.push(self.distance({top:0, left:self.options.width}, ui.position));
				this.values.push(self.distance({top:self.options.height, left:self.options.width}, ui.position));
				this.values.push(self.distance({top:self.options.height, left:0}, ui.position));
				this.values = _.map(this.values, function(value){ return (value*100/self.max).toFixed(0); });
				console.log(this.values);
			},
      });
	},
	
	distance: function(p1, p2) {
		return Math.sqrt((p2.left -p1.left)*(p2.left -p1.left) + (p2.top-p1.top)*(p2.top-p1.top));
	},
	
	_setOption: function(option, value) {
		$.Widget.prototype._setOption.apply( this, arguments );
	}
});

}));