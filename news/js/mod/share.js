var NUI = window.NUI || {};
NUI.share = {
	config:{
		$container: $('<div class="g-news-share"></div>'),
		$inner:$('<div class="inner"></div>')
	},
	containerWidth:0,
	init: function(ele, options){
		var self = this
		,	$container = this.config.$container
		,	$inner = this.config.$inner
		,	timmer = null
		;
		
		
		this.initShare();
		
		$(document).delegate(ele, {
			"mouseenter": function(){
				var pos = self.getPos($(this))
				,	tpl = self.tpl()
				;
				
				if(timmer) {
					clearTimeout(timmer);
					timmer = null;
				}
				
				$inner.html(tpl);
				$container.css({
					left:pos.left,
					top:pos.top,
					width:0
				}).show();
				
				self.anim($container);
				
			},
			"mouseleave": function(){
				timmer = setTimeout(function(){
					$container.hide();
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
					$container.hide();
				}, 100);
			}
		});
		
	},
	anim: function($ele, callBack) {
		var _width = this.containerWidth;
		
		console.info(_width);
		
		$ele.stop(true,false).animate({
			width:_width
		},300);
	},
	getPos: function($ele, direction){
		var _offset = $ele.offset()
		,	_left = _offset.left
		,	_top = _offset.top
		,	_width = $ele.width()
		,	_direct = direction ? direction : "right"
		;
		
		switch(_direct) {
			case "right":
				 _left = _left + _width;
				 break;
		}
		
		return {
			left:_left,
			top:_top
		};
		
	},
	initShare:function(){
		var $container = this.config.$container
		,	$inner = this.config.$inner
		,	tpl = this.tpl()
		;
		
		$inner.html(tpl);
		$container.html($inner).css({
			"position": "absolute",
			"display": "none"
		}).appendTo('body');
		
		$inner.css({width:$container.width()+30});
		this.containerWidth = $container.width();
	},
	tpl: function() {
		return '<a href="#" class="g-icobg weibo g-anim"></a><a href="#" class="g-icobg qq g-anim"></a><a href="#" class="g-icobg tencent g-anim"></a>';
	}
};

$(function(){
	NUI.share.init(".js-newsShare");
});
