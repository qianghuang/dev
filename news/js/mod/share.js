var NUI = window.NUI || {};
NUI.share = {
	config:{
		$container: $('<div class="g-news-share"></div>'),
		$outer: $('<div class="outer"></div>'),
		$inner:$('<div class="inner"></div>')
	},
	containerWidth:0,
	init: function(ele, options){
		var self = this
		,	$container = this.config.$container
		,	$inner = this.config.$inner
		,	$outer = this.config.$outer
		,	timmer = null
		,	outerClass = {
				left : "outer outer-left",
				right: "outer outer-right" 
			}
		,	innerClass = {
				left : "inner inner-left",
				right: "inner inner-right" 
			}
		,	opts
		;
		
		opts = {
			direction: "right"
		};
		
		opts = $.extend({}, opts, options);
		
		this.initShare();
		console.info(this.shareCount);
		$(document).delegate(ele, {
			"mouseenter": function(){
				var direction = $(this).data("direction") || opts.direction
				,	pos = self.getPos($(this), direction)
				,	tpl = self.tpl()
				;
				
				if(timmer) {
					clearTimeout(timmer);
					timmer = null;
				}
				
				$inner.html(tpl);
				$outer.removeClass().addClass(outerClass[direction]);
				$inner.removeClass().addClass(innerClass[direction]);
				$container.css(pos).show();
				
				self.anim($outer);
				
			},
			"mouseleave": function(){
				timmer = setTimeout(function(){
					self.anim($outer, {
						end: {
							width:0
						}
					});
					// $container.hide().css({width:0});
				}, 100);
			}
		});
		
		$container.on({
			"mouseenter": function(){
				if(timmer) {
					clearTimeout(timmer);
					timmer = null;
				}
			},
			"mouseleave": function(){
				timmer = setTimeout(function(){
					self.anim($outer, {
						end: {
							width:0
						}
					});
				}, 100);
			}
		});
		
	},
	anim: function($ele, options) {
		var _width = this.containerWidth;
		var def = {
			end: {
				width:_width
			}
		};
		var opts = $.extend({}, def);
		
		if(typeof options == "object") {
			opts = $.extend({}, def, options);
			if(typeof options.end == "object") {
				opts.end = $.extend({}, def.end, options.end);
			}
		}
		
		
		$ele.stop(true,false).animate(opts.end,300);
	},
	getPos: function($ele, direction){
		var _offset = $ele.offset()
		,	_left = _offset.left
		,	_top = _offset.top
		,	_width = $ele.width()
		,	_height = $ele.height()
		,	_shareWidth = this.containerWidth
		,	_shareHeight = this.config.$container.height()
		,	_margin = 6
		,	_position = {}
		;
		
		
		switch(direction) {
			case "right":
				 _left = _left + _width + _margin;
				 _position = {
				 	left:_left,
				 	top:_top + (_height - _shareHeight)/2 
				 };
				 break;
			case "left":
				 _left = _left - _margin;
				 _position = {
				 	left:_left,
				 	top:_top + (_height - _shareHeight)/2 
				 };
				 break;
		}
		
		return _position;
		
	},
	initShare:function(){
		var $container = this.config.$container
		,	$inner = this.config.$inner
		,	$outer = this.config.$outer
		,	tpl = this.tpl()
		;
		
		$inner.html(tpl).appendTo($outer);
		$container.html($outer).appendTo('body');
		
		this.containerWidth = $container.width();
		$inner.css({
			width:$container.width()+30
		});
		$outer.css({width:0});
	},
	tpl: function() {
		return '<a href="#" class="g-icobg weibo g-anim"></a><a href="#" class="g-icobg qq g-anim"></a><a href="#" class="g-icobg tencent g-anim"></a>';
	}
};

$(function(){
	NUI.share.init(".js-newsShare");
	NUI.share.init(".js-newsShare2");
});
