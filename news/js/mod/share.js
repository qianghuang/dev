var NUI = window.NUI || NUI;
NUI.share = {
	config: {
		$container: '<div class="g-news-share"></div>',
		$inner: '<div class="inner"></div>'
	},
	init: function(){
		
	},
	anim: function(){
		
	},
	initTpl: function(){
		var self = this
		,	$container = this.config.$container
		,	$inner = this.config.$inner
		;
		
		$container.html($inner);
		$inner.css()
		
		
	},
	tpl: function() {
		return '<a href="#" class="g-icobg weibo g-anim"></a><a href="#" class="g-icobg qq g-anim"></a><a href="#" class="g-icobg renren g-anim"></a>';
	}
};


$(function(){
	NUI.share.init($(".js-newsShare"));
});
