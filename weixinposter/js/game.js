var oBtn = document.getElementById("js-btn-love")
,	lis = $("#js-love-text")
,	total = 0
,	timmer = null
,	LINE_COUNT = 10
,	charTime = 0.6
,	interTime = charTime * 1000
,	disabledSty = "btn-disabled"
;

oBtn.addEventListener("touchstart",function(e){
	e.preventDefault();
	if($(this).hasClass(disabledSty)) {
		return;
	}
	timmer = setInterval(function(){
		var loveText;
		total++;
		loveText = total%LINE_COUNT==0?'爱<br/>':'爱';
		lis.append(loveText);
	},interTime);
});
oBtn.addEventListener("touchend",function(){
	if(timmer) {
		clearInterval(timmer);
		timmer = null;
	}
	//$(this).addClass(disabledSty);
	var lines = Math.ceil(total / LINE_COUNT);
	jumpTo(lines);
});
function jumpTo(lines) {
	if(lines < 1) {
		
	} else if(lines < 4) {
		location.href = "result.html?r=1";
	} else if (lines < 6) {
		location.href = "result.html?r=2";
	} else if (lines < 9) {
		location.href = "result.html?r=3";
	} else {
		location.href = "result.html?r=4";
	}
}
function onBridgeReady() {
    var mainTitle="来吧孩子",
        mainDesc="深圳卫视《来吧孩子》大型观察真人秀节目",
        mainURL="http://dev.hotkeypower.com/lfhtml/liaba/index.html",
        mainImgUrl= "http://dev.hotkeypower.com/lfhtml/liaba/img/jia.jpg";

    //转发朋友圈
    WeixinJSBridge.on("menu:share:timeline", function(e) {
        var data = {
            img_url:mainImgUrl,
            img_width: "120",
            img_height: "120",
            link: mainURL,
            //desc这个属性要加上，虽然不会显示，但是不加暂时会导致无法转发至朋友圈，
            desc: mainDesc,
            title: mainTitle
        };
        WeixinJSBridge.invoke("shareTimeline", data, function(res) {
            WeixinJSBridge.log(res.err_msg)
        });
    });
    //同步到微博
    WeixinJSBridge.on("menu:share:weibo", function() {
        WeixinJSBridge.invoke("shareWeibo", {
            "content": mainDesc,
            "url": mainURL
        }, function(res) {
            WeixinJSBridge.log(res.err_msg);
        });
    });
    //分享给朋友
    WeixinJSBridge.on('menu:share:appmessage', function(argv) {
        WeixinJSBridge.invoke("sendAppMessage", {
            img_url: mainImgUrl,
            img_width: "120",
            img_height: "120",
            link: mainURL,
            desc: mainDesc,
            title: mainTitle
        }, function(res) {
            WeixinJSBridge.log(res.err_msg)
        });
    });
};
//执行
document.addEventListener('WeixinJSBridgeReady', function() {
    onBridgeReady();
});