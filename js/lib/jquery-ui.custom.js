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
			points: true			
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
		this._values = [];

		this._controlHeight = this.get_controlHeight();
		this._maxRaw = this.getMaxRawValue();
		
		if (this.options.control.start == null) {
			this.options.control.start = {
				left: (this.options.size/2) - (this.options.control.size/2),
				top: (this._controlHeight/2) - (this.options.control.size/2),
			}; 
		};
		
		this._values = this.getValues(this.options.control.start);
		
		$.each(this.options.components, function( i, component ) {
			var value = self.options.visible.values?'<div class="component-value">'+self._values[i]+'</div>':'';
			var point = self.options.visible.points
				?'<div class="component-point" style="width:'+ self.options.control.size +'px;height:'+ self.options.control.size +'px;"></div>':'';
			var label = '<div class="component-name">'+ component.label + '</div>'; 
			var html = (component.class.indexOf('bottom') == 0)
				?value+label
				:label+value; 
	 		//html += point;
			self._surface.append('<div class="component-container '+ component.class +'">' + html + '</div>\n');
		});

		this._surface.append('<div class="control-point" style="' + 
				'top:'+	this.options.control.start.top +'px;' + 
				'left:'+ this.options.control.start.left +'px;' +
				'width:'+ this.options.control.size +'px;' + 
				'height:'+ this.options.control.size +'px;' +
				'background:'+ this.options.control.color +';' +
			'"></div>');

		if (self.options.visible.name) {
			this._surface.append('<div class="surface-name">' + this.options.name + '</div>');
		}

		this.element.append(this._surface); 
		this.element.css('width', this.options.size);
		this.element.css('height', this._controlHeight);		
		this.element.css('border-radius', this.options.control.size/2);
		this.element.css('background', this.options.background);
		this.element.addClass('select-surface-control');

		this.element.click(function(e){
			var posX = $(this).position().left,posY = $(this).position().top;
			var position = {top:e.pageY - posY, left:e.pageX - posX};

			if (position.top < self.options.control.size) position.top = self.options.control.size; 
			if (position.top > self._controlHeight) position.top = self._controlHeight;
			if (position.left < self.options.control.size) position.left = self.options.control.size;
			if (position.left > self.options.size) position.left = self.options.size;

			        	
        	$( '#'+self.element.attr('id') + " .control-point" ).animate({
        		'top': position.top - self.options.control.size,
        		'left': position.left - self.options.control.size
        	},250);
        	
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
	
	get_controlHeight: function() {
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
				values.push(this.distance({top:this._controlHeight, left:this.options.size}, position));
				values.push(this.distance({top:this._controlHeight, left:0}, position));
				break;
			case 4: 
				values.push(this.distance({top:0, left:0}, position));
				values.push(this.distance({top:0, left:this.options.size}, position));
				values.push(this.distance({top:this.options.size, left:this.options.size}, position));
				values.push(this.distance({top:this.options.size, left:0}, position));
				break;
		}	
		values = _.map(values, function(value){ return (100 - value*100/self._maxRaw).toFixed(0); });
		
		return values;
	},
	
	updateUiValues: function() {
		switch(this.options.components.length) {
			case 1: 
				$( '#'+this.element.attr('id') + " .top-left .component-value").html(this._values[0]);
				break;
			case 2: 
				$( '#'+this.element.attr('id') + " .top-left .component-value").html(this._values[0]);
				$( '#'+this.element.attr('id') + " .top-right .component-value").html(this._values[1]);
				break;
			case 3: 
				$( '#'+this.element.attr('id') + " .top .component-value").html(this._values[0]);
				$( '#'+this.element.attr('id') + " .bottom-right .component-value").html(this._values[1]);
				$( '#'+this.element.attr('id') + " .bottom-left .component-value").html(this._values[2]);
				break;
			case 4: 
				$( '#'+this.element.attr('id') + " .top-left .component-value").html(this._values[0]);
				$( '#'+this.element.attr('id') + " .top-right .component-value").html(this._values[1]);
				$( '#'+this.element.attr('id') + " .bottom-right .component-value").html(this._values[2]);
				$( '#'+this.element.attr('id') + " .bottom-left .component-value").html(this._values[3]);
				break;
		}		
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