var YS = window.YS || {};

YS.showCase = function($ele){
	this.$ele = $ele;
	this.$prev = $ele.find(".prev");
	this.$next = $ele.find(".next");
	this.$list = $ele.find(".list");
	this.$li = $ele.find("li");
	this.index = 0;
	this.width = this.$li.width();
	this.total = this.$li.length;
	this.doing = false;
	
	if($ele && $ele.length > 0) {
		this.init();
	}
};

YS.showCase.prototype = {
	init: function(){
		var $prev = this.$prev
		,	$next = this.$next
		,	self = this
		;
		
		this.setWidth();
		this.changeStatus();
		$next.click(function(){
			self.next.call(self);
		});
		$prev.click(function(){
			self.prev.call(self);
		});
		
	},
	setWidth: function(){
		var width = this.width * this.total;
		
		this.$list.css({
			width:width
		});
	},
	next: function() {
		var self = this
		,	index = self.index
		,	total = self.total
		;
		
		if(index > total - 2 || self.doing) {
			return ;
		}
		self.doing = true;
		self.index++;
		self.changeStatus.call(self);
		self.anim.call(self);
		
	},
	prev: function() {
		var self = this
		,	index = self.index
		,	total = self.total
		;
		
		if(index < 1 || self.doing) {
			return ;
		}
		self.doing = true;
		self.index--;
		self.changeStatus.call(self);
		self.anim.call(self);
		
	},
	changeStatus: function(){
		var self = this;
		if(self.index == 0) {
			self.$prev.addClass("prev-disable");
		} else {
			self.$prev.removeClass("prev-disable");
		}
		if(self.index == self.total - 1) {
			self.$next.addClass("next-disable");
		} else {
			self.$next.removeClass("next-disable");
		}
	},
	anim: function(){
		var self = this
		,	$list = self.$list
		,	endLeft = 0
		;
		
		endLeft -= self.width * self.index;
		
		this.$list.stop(true,false).animate({
			left:endLeft
		},500, function(){
			self.doing = false;
		});
		
	}
};

YS.contact = {
	init: function($ele){
		var self = this;
		$ele.click(function(){
			self.open.call(self);
		});
	},
	open: function(){
		this.createLayer().show();
	},
	create: function(){
		
	},
	createLayer: function(){
		var $layer = $('<div class="g-ys-layer"></div>');
		$layer.hide().appendTo('body');
		return $layer;
	}
};

$(function(){
	new YS.showCase($("#js-slider"));
	YS.contact.init($("#js-contact"));
});
