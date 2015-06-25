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
	
	//defaults
	options: {
		size: 200,
		name: 'surface',
		background: 'url("assets/img/graphy.png")',
		
		control: {
			size: 20,
			start: null,
			color: '#275d74'	
		},
		visible: {
			name: true,
			values: true,			
		},
		components:[
			{label:'component1', position:'top-left'},
			{label:'component2', position:'top-right'},
			{label:'component3', position:'bottom-right'},
			{label:'component4', position:'bottom-left'},
		]
	},
	
	_create: function() {
		this._surface = $("<div>");
		var self = this;
		this._values = [];

		this._controlHeight = this.getControlHeight();
		this._maxRaw = this.getMaxRawValue();
		
		if (this.options.control.start == null) {
			this.options.control.start = {
				left: (this.options.size/2) - (this.options.control.size/2),
				top: (this._controlHeight/2) - (this.options.control.size/2),
			}; 
		};
		
		this._values = this.getValues(this.options.control.start);
		
		$.each(this.options.components, function( i, component ) {
			var label = '<div class="component-name" style="">'+ component.label + '</div>';
			var point = '<div class="component-point" style="' + 
				'width:'+ self.options.control.size + 'px;' +
				'height:'+ self.options.control.size + 'px;' +
				'line-height:'+ self.options.control.size +'px;">' + 
				self._values[i] + 
			'</div>';
			self._surface.append('<div class="component-container ' + component.position + '" style="' + 
				self.getPositionStyle(component.position) + '">' + point + label + 
			'</div>\n');
		});

		this._surface.append('<div class="control-point" style="' + 
				'top:'+	this.options.control.start.top +'px;' + 
				'left:'+ this.options.control.start.left +'px;' +
				'width:'+ this.options.control.size +'px;' + 
				'height:'+ this.options.control.size +'px;' +
				'background:'+ this.options.control.color +';' +
			'"></div>');

		if (self.options.visible.name) {
			var style = (this.options.components.length==1)?'transform:translate(-50%, 100%)':'';
			this._surface.append('<div class="surface-name" style="'+style+'">' + this.options.name + '</div>');
		}

		this.element.append(this._surface); 
		this.element.css('width', this.options.size);
		this.element.css('height', this._controlHeight);		
		this.element.css('border-radius', (this.options.components.length!=1)
			?this.options.control.size/2
			:this.options.size/2);
		this.element.css('background', this.options.background);
		this.element.addClass('select-surface-control');

		this.element.click(function(e){
			var posX = $(this).position().left,posY = $(this).position().top;
			var position = {top:e.pageY - posY, left:e.pageX - posX};
			var point = { 
				top: position.top,
				left: position.left
			};
			
			if(position.top + self.options.control.size > self._controlHeight) {
				position.top = self._controlHeight - self.options.control.size; 
			}
			if(position.left + self.options.control.size > self.options.size) {
				position.left = self.options.size - self.options.control.size; 
			}
			
			self.updateControlPoint(point);
			        	
        	self._values = self.getValues(position);
        	if (self.options.visible.values) {
        		self.updateUiValues();        		
        	}

		});

		$( '#'+this.element.attr('id') + " .control-point" ).draggable({
			containment: '#'+this.element.attr('id'),
			cursorAt: {
				top: this.options.control.size/2, 
				left:this.options.control.size/2
			},
			scroll: false,
			drag: function(event, ui) {
				self._values = self.getValues(ui.position);
				if (self.options.visible.values) {
					self.updateUiValues();
				}

			},
			stop: function(event, ui) {
				self._values = self.getValues(ui.position);
				if (self.options.visible.values) {
					self.updateUiValues();
				}
			},
		});
	},
	
	values: function() {
		return this._values;
	},
	
	getPositionStyle: function(position) {
		var halfLength = (this.options.size-this.options.control.size)/2;
		switch(position) {
			case 'top-left':	return 'top:0px;left:0px;';
			case 'top':			return 'top: 0px;left:' + halfLength + 'px;';
			case 'top-right':	return 'top:0px;right:' + this.options.control.size + 'px;';
			case 'right':		return 'top: ' + halfLength + 'px;left:0px;';
			case 'bottom-right':return 'bottom:' + this.options.control.size + 'px;right:' + this.options.control.size + 'px;';
			case 'bottom':		return 'bottom:' + this.options.control.size + 'px;left:' + halfLength + 'px;';
			case 'bottom-left':	return 'bottom:' + this.options.control.size + 'px;left:0px;';
			case 'left':		return 'top: ' + halfLength + 'px;left:0px;';
			case 'center':		return 'top: ' + halfLength + 'px;left:' + halfLength + 'px;';
		}
	},

	updateControlPoint: function(position) {		
		if (position.top < this.options.control.size) 
			position.top = this.options.control.size/2; //ok 
		
		if (position.top > this._controlHeight-this.options.control.size/2) 
			position.top = this._controlHeight-this.options.control.size/2; //ok
		
		if (position.left < this.options.control.size/2) 
			position.left = this.options.control.size/2; //ok
		
		if (position.left > this.options.size-this.options.control.size/2) 
			position.left = this.options.size-this.options.control.size/2; //ok
		
		position.top -= this.options.control.size/2;
		position.left -= this.options.control.size/2;
		
    	$( '#'+this.element.attr('id') + " .control-point" ).animate({
    		'top': position.top,
    		'left': position.left
    	},250);
	},
	
	getControlHeight: function() {
		switch(this.options.components.length) {
			case 1: return this.options.size;
			case 2: return this.options.control.size;
			case 3: return this.options.size*Math.sqrt(3)/2;
			case 4: return this.options.size;
		}
	},
	
	getValues: function(position) {
		var length = this.options.size - this.options.control.size;
		var values = [];
		var self = this;
		switch(this.options.components.length) {
			case 1: 
				values.push(this.distance({top:length/2, left:length/2}, position));
				break;
			case 2: 
				values.push(this.distance({top:0, left:0}, position));
				values.push(this.distance({top:0, left:length}, position));
				break;
			case 3: 
				values.push(this.distance({top:0, left:length/2}, position));
				values.push(this.distance({top:this._controlHeight, left:length}, position));
				values.push(this.distance({top:this._controlHeight, left:0}, position));
				break;
			case 4: 
				values.push(this.distance({top:0, left:0}, position));
				values.push(this.distance({top:0, left:length}, position));
				values.push(this.distance({top:length, left:length}, position));
				values.push(this.distance({top:length, left:0}, position));
				break;
		}	
		values = _.map(values, function(value){ return (100 - value*100/self._maxRaw).toFixed(0); });
		
		return values;
	},
	
	updateUiValues: function() {
		switch(this.options.components.length) {
			case 1: 
				$( '#'+this.element.attr('id') + " .center .component-point").html(this._values[0]);
				break;
			case 2: 
				$( '#'+this.element.attr('id') + " .top-left .component-point").html(this._values[0]);
				$( '#'+this.element.attr('id') + " .top-right .component-point").html(this._values[1]);
				break;
			case 3: 
				$( '#'+this.element.attr('id') + " .top .component-point").html(this._values[0]);
				$( '#'+this.element.attr('id') + " .bottom-right .component-point").html(this._values[1]);
				$( '#'+this.element.attr('id') + " .bottom-left .component-point").html(this._values[2]);
				break;
			case 4: 
				$( '#'+this.element.attr('id') + " .top-left .component-point").html(this._values[0]);
				$( '#'+this.element.attr('id') + " .top-right .component-point").html(this._values[1]);
				$( '#'+this.element.attr('id') + " .bottom-right .component-point").html(this._values[2]);
				$( '#'+this.element.attr('id') + " .bottom-left .component-point").html(this._values[3]);
				break;
		}		
	},
	
	getMaxRawValue: function() {
		var length = this.options.size - this.options.control.size;
		switch(this.options.components.length) {
			case 1: return length/2;
			case 4:	return Math.sqrt( length * length * 2); 
			case 2: return length;
			case 3: return length;
						
		}
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