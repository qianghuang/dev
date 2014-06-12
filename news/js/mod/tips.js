var kmfTips = (function() {
	var $container = $('<div class="g-news-tips"><div class="tips-content"></div><div class="arrow arrow-up"></div></div>');
	var $content = $container.find(".tips-content");
	var $arrow = $container.find(".arrow");
	var arrowSty = {
		down : 'arrow-down',
		up   : 'arrow-up'
	};
	
	$container.hide();
	
	/**
	 * TODO:全站自定义 title与alt
	 * @param obj {String} ["open"|"close"] 显示|隐藏
	 * 
	 */
	return function(obj){
		var msg = $.trim(this.data("msg"))   // 获取tips内容
		,	top = this.offset().top          // 当前dom引用的页面左边距
		,	left = this.offset().left        // 当前dom引用的页面上边距
		,	targetWidth = this.width()       // 当前dom引用的宽度
		,	targetHeight = this.height()     // 当前dom引用的高度
		,	container_w                      // tips的宽度
		,	container_h                      // tips的高度
		,	finalTop                         // tips的显示位置:top
		,	finalLeft                        // tips的显示位置:left
		,	sTop = $(window).scrollTop()     // 滚动距离
		,	DIFF_TOP = 6                     // 距离dom的距离
		;			
		
		
		if(typeof msg == "undefined" || msg == "") {
			$container.hide();
			return ;
		}
		msg = msg.replace(/\<(\/?script)/g,"&lt;$1");
		msg = msg.replace(/(script)\>/g,"$1&gt;");
		
		$content.html(msg);
		$('body').append($container);
		container_w = $container.outerWidth();
		container_h = $container.outerHeight();
		finalTop = top - container_h - DIFF_TOP;
		finalLeft = left + targetWidth/2 - container_w/2;
		
		if(sTop > finalTop) {
			finalTop = top + targetHeight + DIFF_TOP;
			$arrow.addClass(arrowSty.down);
			$arrow.removeClass(arrowSty.up);
		} else {
			$arrow.addClass(arrowSty.up);
			$arrow.removeClass(arrowSty.down);
		}
		
		$container.css({
			top:finalTop,
			left:finalLeft
		});
		
		if(obj == "close") {
			$container.hide();
		} else {
			$container.show();
		}
	};
})();

$.fn.extend({
	kmfTips:kmfTips
});


$(function(){
	
	//全站tips的调用
	$(document).delegate(".js-news-tips",{
		"mouseenter":function(){
			$(this).kmfTips("open");
		},
		"mouseleave":function(){
			$(this).kmfTips("close");
		}
	});
	
});