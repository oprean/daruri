(function(e){typeof define=="function"&&define.amd?define(["jquery"],e):e(jQuery)})(function(e){e.widget("ui.surface",{options:{size:200,name:"surface",background:'url("assets/img/graphy.png")',control:{size:20,start:null,color:"#275d74"},visible:{name:!0,values:!0,points:!0},components:[{label:"component1","class":"top-left"},{label:"component2","class":"top-right"},{label:"component3","class":"bottom-right"},{label:"component4","class":"bottom-left"}]},_create:function(){this._surface=e("<div>");var t=this;this._values=[],this._controlHeight=this.get_controlHeight(),this._maxRaw=this.getMaxRawValue(),this.options.control.start==null&&(this.options.control.start={left:this.options.size/2-this.options.control.size/2,top:this._controlHeight/2-this.options.control.size/2}),this._values=this.getValues(this.options.control.start),e.each(this.options.components,function(e,n){var r=t.options.visible.values?'<div class="component-value">'+t._values[e]+"</div>":"",i='<div class="component-name">'+n.label+"</div>",s=n.class.indexOf("bottom")==0?r+i:i+r;t._surface.append('<div class="component-container '+n.class+'">'+s+"</div>\n")}),this._surface.append('<div class="control-point" style="top:'+this.options.control.start.top+"px;"+"left:"+this.options.control.start.left+"px;"+"width:"+this.options.control.size+"px;"+"height:"+this.options.control.size+"px;"+"background:"+this.options.control.color+";"+'"></div>'),t.options.visible.name&&this._surface.append('<div class="surface-name">'+this.options.name+"</div>"),this.element.append(this._surface),this.element.css("width",this.options.size),this.element.css("height",this._controlHeight),this.element.css("border-radius",this.options.control.size/2),this.element.css("background",this.options.background),this.element.addClass("select-surface-control"),this.element.click(function(n){var r=e(this).position().left,i=e(this).position().top,s={top:n.pageY-i,left:n.pageX-r};s.top<t.options.control.size&&(s.top=t.options.control.size),s.top>t._controlHeight&&(s.top=t._controlHeight),s.left<t.options.control.size&&(s.left=t.options.control.size),s.left>t.options.size&&(s.left=t.options.size),e("#"+t.element.attr("id")+" .control-point").animate({top:s.top-t.options.control.size,left:s.left-t.options.control.size},250),t._values=t.getValues(s),t.options.visible.values&&t.updateUiValues()}),e("#"+this.element.attr("id")+" .control-point").draggable({containment:"#"+this.element.attr("id"),cursorAt:{top:this.options.control.size/2,left:this.options.control.size/2},scroll:!1,drag:function(e,n){t._values=t.getValues(n.position),t.options.visible.values&&t.updateUiValues()},stop:function(e,n){t._values=t.getValues(n.position),t.options.visible.values&&t.updateUiValues()}})},values:function(){return this._values},get_controlHeight:function(){switch(this.options.components.length){case 1:case 2:return this.options.control.size;case 3:return this.options.size*Math.sqrt(3)/2;case 4:return this.options.size}},getValues:function(e){var t=[],n=this;switch(this.options.components.length){case 1:t.push(e.left);break;case 2:t.push(this.distance({top:0,left:0},e)),t.push(this.distance({top:0,left:this.options.size},e));break;case 3:t.push(this.distance({top:0,left:this.options.size/2},e)),t.push(this.distance({top:this._controlHeight,left:this.options.size},e)),t.push(this.distance({top:this._controlHeight,left:0},e));break;case 4:t.push(this.distance({top:0,left:0},e)),t.push(this.distance({top:0,left:this.options.size},e)),t.push(this.distance({top:this.options.size,left:this.options.size},e)),t.push(this.distance({top:this.options.size,left:0},e))}return t=_.map(t,function(e){return(100-e*100/n._maxRaw).toFixed(0)}),t},updateUiValues:function(){switch(this.options.components.length){case 1:e("#"+this.element.attr("id")+" .top-left .component-value").html(this._values[0]);break;case 2:e("#"+this.element.attr("id")+" .top-left .component-value").html(this._values[0]),e("#"+this.element.attr("id")+" .top-right .component-value").html(this._values[1]);break;case 3:e("#"+this.element.attr("id")+" .top .component-value").html(this._values[0]),e("#"+this.element.attr("id")+" .bottom-right .component-value").html(this._values[1]),e("#"+this.element.attr("id")+" .bottom-left .component-value").html(this._values[2]);break;case 4:e("#"+this.element.attr("id")+" .top-left .component-value").html(this._values[0]),e("#"+this.element.attr("id")+" .top-right .component-value").html(this._values[1]),e("#"+this.element.attr("id")+" .bottom-right .component-value").html(this._values[2]),e("#"+this.element.attr("id")+" .bottom-left .component-value").html(this._values[3])}},getMaxRawValue:function(){return this.options.components.length<4?this.options.size:Math.sqrt(this.options.size*this.options.size*2)},distance:function(e,t){return Math.sqrt((t.left-e.left)*(t.left-e.left)+(t.top-e.top)*(t.top-e.top))},_setOption:function(t,n){e.Widget.prototype._setOption.apply(this,arguments)}})});