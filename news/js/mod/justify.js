/**
 * 栏目对齐
 * @param $ele Dom的jquery引用
 * 
 */
var justifyCol = function($ele){
	var TOP = 70                         // 默认选项
	,	winH = $(window).height() - TOP  // 窗口大小
	,	arrHeight = []                   // 保存各栏目的高度
	,	maxHeight                        // 最大高度
	;
	
	
	
	if($ele.length < 1) {
		return;
	}
	
	$ele.each(function(){
		arrHeight.push($(this).outerHeight());
	});
	arrHeight.push(winH);
	
	maxHeight = Math.max.apply(Math, arrHeight);
	
	$ele.css({
		height:maxHeight
	});
};

$(function(){
	justifyCol($(".js-justify-col"));
});
