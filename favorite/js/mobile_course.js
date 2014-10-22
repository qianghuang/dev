/*!
 * TODO:移动端课程宣传
 * 临时使用方案
 * 直接使用pc端的开发方案
 * 
 */
define(function(require, exports, module){
	var $ = require("zepto")
	,	UA = navigator.userAgent
	,	isMobile = /mobile/i.test(UA)
	,	pcUrl = "http://toefl.kaomanfen.com"
	;
	
	if(!isMobile) {
		location.href = pcUrl;
		return;
	}
	
	var appCover = {
		status: {
			curCover : 0,
			moving   : false,
			startX   : 0,
			startY   : 0,
			distance : 0
		},
		init: function($ele){
			this.$ele = $ele;
			this.$sec = $ele.find(".sec");
			this.coverNum = this.$sec.length;
			this.initPage();
			this.setup();
		},
		initPage: function(){
			var coverWidth = $(window).width()
			,	allWidth
			,	$ele = this.$ele
			;
			
			allWidth = this.coverNum * coverWidth;
			$ele.css({
				"width":allWidth
			});
			this.$sec.css({
				"width":coverWidth
			});
		},
		setup:function(){
			var $ele = this.$ele
			,	self = this
			;
			
			$ele.on("touchstart", function(event){
				self.fnStart.call(self, event);
			});
			$ele.on("touchmove", function(event){
				self.fnMove.call(self, event);
			});
			$ele.on("touchend", function(event){
				self.fnEnd.call(self, event);
			});
			
		},
		fnStart: function(event){
			for(var porp in event) {
				//console.info(porp);
			}
			
			this.status.startX = event.touches[0].pageX;
			this.status.moving = true;
			
			//console.info(event.touches[0].screenX);
			console.info(event.touches[0].pageX);
		},
		fnMove: function(event){
			this.status.distance = event.touches[0].pageX - this.status.startX;
			this.fnSetSty();
		},
		fnEnd: function(){
			this.status.moving = false;
		},
		fnSetSty : function(){
	        var x = this.status.distance
	        ,	time = 300
	       	;
	        this.$ele.css({
	            '-webkit-transition':'-webkit-transform '+time+'ms',
	            '-webkit-transform':'translate3d('+x+'px,0,0)',
	            '-webkit-backface-visibility': 'hidden',
	            'transition':'transform '+time+'ms',
	            'transform':'translate3d('+x+'px,0,0)'
	        });
	    }
	};
	
	appCover.init($(".g-m-cover"));
	
});
