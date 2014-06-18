var NUI = window.NUI || {};
NUI.newList = {
	curPage: 0,
	loading: false,
	$load: $('<div class="s-newslist-loading"><span class="loading">加载中…</span></div>'),
	$ele:null,
	init: function($ele, options) {
		var opts = {
			url:""
		};
		var self = this;
		this.$ele = $ele;
		
		if(typeof options == "object") {
			$.extend(opts, options);
		}
		
		$(window).scroll(function(){
			var isLoad = self.isScrollLoad();
			if(isLoad) {
				self.loadNews(opts.url , function(data){
					$ele.append(data);
				});
			}
		});
		
	},
	loadNews: function(url, callBack){
		var self = this
		;
		
		if(this.loading) {
			return ;
		}
		
		this.loading = true;
		this.$ele.append(this.$load);
		$.post(url, function(data){
			if($.trim(data) != "") {
				if(typeof callBack == "function") {
					callBack(data);
				}
			}
			self.$load.remove();
			self.loading = false;
		});
	},
	isScrollLoad: function(){
		var winHeight = $(window).height()
		,	docHeight = $(document).height()
		,	scrollTop = $(document).scrollTop();
		;
		
		
		return scrollTop + winHeight >= docHeight;
		
	}
	
};