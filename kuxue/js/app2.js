var UA = navigator.userAgent
,	isMobile = /mobile/i.test(UA)
,	pcUrl = "http://www.024360.com/hq/kuxue/views/index.html"
;

/*
if(!isMobile) {
	location.href = pcUrl;
	return;
}
*/
var appCover = {
	status: {
		curCover : 0,
		moving   : false,
		startX   : 0,
		startY   : 0,
		distance : 0,
		boxLeft  : 0
	},
	init: function($ele){
		this.$ele = $ele;
		this.$sec = $ele.find(".sec");
		this.$page = $(".g-m-cover-page .page");
		this.timmer = null;
		this.duration = 300;
		this.coverNum = this.$sec.length;
		//this.coverWidth = $(window).width();
		this.coverWidth = $(".g-m-wrapper").width();
		$(".g-m-wrapper").show();
		this.initPage();
		this.setup();
	},
	initPage: function(isChange){
		this.coverWidth = $(".g-m-wrapper").width();
		this.status.boxLeft = -1 * this.coverWidth * this.status.curCover;
		this.status.distance = 0;
		
		var coverWidth = this.coverWidth
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
		this.$sec.eq(0).addClass("sec1-show");
		$(".g-m-wrapper").css({
			display:"block"
		});
		if(isChange) {
			this.fnSetSty();
		}
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
		
		$(window).on("resize", function(){
			self.initPage.call(self, true);
		});
		
	},
	fnStart: function(event){
		var status = this.status;
		if(status.moving) {
			return;
		}
		
		this.status.startX = event.touches[0].pageX;
		this.status.moving = true;
	},
	fnMove: function(event){
		event.preventDefault();
		this.status.distance = event.touches[0].pageX - this.status.startX;
		this.fnSetSty(true);
	},
	fnEnd: function(){
		if(this.status.moving) {
			return;
		}
		if(this.status.distance < 0) {
			this.next.call(this);
		} else if (this.status.distance > 0) {
			this.prev.call(this);
		}
	},
	next: function(){
		if(this.status.curCover < this.coverNum - 1) {
			this.status.curCover++;
		}
		this.status.boxLeft = -1 * this.coverWidth * this.status.curCover;
		this.status.distance = 0;
		this.fnSetSty();
	},
	prev: function() {
		if(this.status.curCover > 0) {
			this.status.curCover--;
		}
		this.status.boxLeft = -1 * this.coverWidth * this.status.curCover;
		this.status.distance = 0;
		this.fnSetSty();
	},
	fnSetSty : function(flag){
        var self = this
        ,	status = this.status
        ,	time = flag ? 0 : this.duration
        ,	dist = this.status.boxLeft + this.status.distance;
       	;
       	
       	
        this.$ele.css({
            '-webkit-transition':'-webkit-transform '+time+'ms',
            '-webkit-transform':'translate3d('+dist+'px,0,0)',
            '-webkit-backface-visibility': 'hidden',
            'transition':'transform '+time+'ms',
            'transform':'translate3d('+dist+'px,0,0)'
        });
        setTimeout(function(){
        	self.status.moving = false;
        	self.$sec.each(function(index){
        		$(this).removeClass("sec" + (index + 1) + "-show");
        	});
        	self.$sec.eq(self.status.curCover).addClass("sec" + (self.status.curCover + 1) + "-show");
        	// self.$page.removeClass("curpage");
        	// self.$page.eq(self.status.curCover).addClass("curpage");
        }, time);
    }
};
$("#musicPlay").on("click", function(){
	var bgMusic = document.getElementById("bgMusic");
	if($(this).hasClass("music-ico-on")) {
		bgMusic.pause();
		$(this).removeClass("music-ico-on");		
	} else {
		$(this).addClass("music-ico-on");		
		bgMusic.play();
	}
});