var NUI = NUI || {}; 
NUI.win = {
	closeAlert:null,//提示倒计计数器
	alertCount:3,//提示倒计数
	alert:function(text,type,callBack){
		//参数说明：text:提示文字信息，type:提示类型,有"ok"和"error"类型
		var iconClass,that = this;
		switch (type){
			case "ok":
				iconClass = "newalert-true";
				break;
			case "error":
				iconClass = "newalert-false";
				break;
			case "warn":
				iconClass = "newalert-warning";
				break;
			case "warm":
				iconClass = "newalert-warning";
				break;
			default:
				iconClass = "newalert-true";
		}
		var _html =[
		'<div id="zmAlert" class="newalert '+iconClass+'">',
			'<div class="alert-ico png"></div>',
			'<a class="alertclose"></a>',
			'<div class="container yahei">',
				'<div class="tipscountdown"><span class="count">3</span>秒后隐藏</div>',
				text,
			'</div>',
		'</div>'
		].join("");
		that.alertCount = 3;
		if(that.closeAlert) {
			clearInterval(that.closeAlert);
		}
		if($('#zmAlert').size() > 0) {
			$('#zmAlert').remove();
			$("body").append(_html);
		} else {
			$("body").append(_html);
		}
		$('#zmAlert').stop(true,true).slideDown(300);
		that.closeAlert = setInterval(revoveTips,1000);
		$('#zmAlert').die().live('mouseenter',function(){
			clearInterval(that.closeAlert);
		});
		$('#zmAlert').live('mouseleave',function(){
			that.closeAlert = setInterval(revoveTips,1000);
		});
		$('#zmAlert .alertclose').live('click',function(){
			$("#zmAlert").stop(true,false).slideUp(300,function(){
				if(callBack) {
					callBack();
				}
			});
		});
		function revoveTips() {
			if(that.alertCount < 1){
				clearInterval(that.closeAlert);
				$("#zmAlert").stop(true,false).slideUp(300,function(){
					if(callBack) {
						callBack();
					}
				});
			} else {
				$('#zmAlert .count').text(that.alertCount);
			}
			that.alertCount--;
		}
	}
}; 