function initPage() {
	var pageWidth = $(window).width();
	var pageHeight = $(window).height();
	$(".wrapper").css({
		height:pageHeight
	});
	$(".sec").css({
		height:pageHeight
	});
	$(".slogan").css({
		height:pageHeight
	});
	
	secHeight = pageHeight * $(".wrapper section").length;
    lineHeight = 832 * secHeight / pageHeight;
	
	animatePage(curPage);
	showSlogan();
}


document.body.addEventListener('touchstart', function (e) {
	if($(".container").hasClass("js-disabled-scroll")) {
		return;
	}
    //console.log("target:"+e.target.className);
    e = e.changedTouches[0];
    onStart(e);
});

document.body.addEventListener('touchmove', function (e) {
	if($(".container").hasClass("js-disabled-scroll")) {
		return;
	}
    onMove(e.changedTouches[0], e);
});

document.body.addEventListener('touchend', function (e) {
	if($(".container").hasClass("js-disabled-scroll")) {
		return;
	}
    onEnd(e.changedTouches[0]);
});
// 以下是拖动效果
var startX = 0,
    startY = 0;
    margin = 0;
var pages = null;
var curPage = 0;
var pageWidth = $(window).width(),
    pageHeight = $(window).height();
var lineHeight = 0, secHeight = 0;
var targetElement = null;
var scrollPrevent = false, movePrevent = false, touchDown = false;

$(document).ready(function(){
	initPage();
});

function onStart (e) {
    if(movePrevent == true){
        event.preventDefault();
        return false;
    }
    if($(e.target).parents("#container").length==1){
        scrollPrevent = true;
    }else{
        scrollPrevent = false;
    }

    $(".map").on('click', function(e){
    	$(".map_show").addClass("show");
    })

    if(!$(e.target).parents("#container").length==1){
	    $(".map_show").removeClass("show");
    }

    touchDown = true;

    // 起始点，页面位置
    startX = e.pageX;
    startY = e.pageY;
    //margin = parseInt($(".sec").css("top"));
    //-webkit-transform:translateY(0px)

    //matrix(1, 0, 0, 1, 0, 8)

    $(".container").addClass("drag");

    margin = $(".container").css("-webkit-transform");
    //margin = "matrix(1, 0, 0, 1, 0, -50)";
    margin = margin.replace("matrix(", "");
    margin = margin.replace(")", "");
    margin = margin.split(",");
    margin = parseInt(margin[5]);
}

function onMove (e, oe) {
    if(movePrevent == true || touchDown != true){
        event.preventDefault();
        return false;
    }
    event.preventDefault();
    if( scrollPrevent==false && e.pageY!=startY){
        var temp = margin + e.pageY - startY;
        var diff = e.pageY - startY;
        var zoom=1;
        if(diff > 0) {
        	if(curPage == 2) return;
			zoom -= diff/pageHeight*0.4;
	        $(".js-scroll").eq(curPage).css("-webkit-transform", "scale("+zoom+")");
	        $(".js-scroll").eq(curPage).css("-webkit-transform-origin", "center top");
        } else {
        	zoom -= -diff/pageHeight*0.4;
	        $(".js-scroll").eq(curPage).css("-webkit-transform", "scale("+zoom+")");
	        $(".js-scroll").eq(curPage).css("-webkit-transform-origin", "center bottom");
        }
        
        
        $(".container").css("-webkit-transform", "matrix(1, 0, 0, 1, 0, "+temp+")");
        var b =  lineHeight / secHeight * temp;
        $(".line").css("-webkit-transform", "matrix(1, 0, 0, 1, 0, "+b+")");
    }
}

function onEnd (e) {
    if(movePrevent == true){
        event.preventDefault();
        return false;
    }

    touchDown = false;

    if( scrollPrevent==false ){
        // 抬起点，页面位置
        endX = e.pageX;
        endY = e.pageY;
        // swip 事件默认大于50px才会触发，小于这个就将页面归回
        if( Math.abs(endY-startY)<=50) {
            animatePage(curPage);
        }else{
        	if(endY>startY){
        		if(curPage == 2) {
        			return;
        		}
        		prevPage();
        	}else{
        		nextPage();
        	}
        }
    }

    $(".container, .line").removeClass("drag");
}

function prevPage(){
    var newPage = curPage - 1;
    animatePage(newPage);
    
}
function nextPage(){
    var newPage = curPage + 1;
    animatePage(newPage);
}

function animatePage( newPage ){
    if(newPage<0){
        newPage = 0;
    }
    if(newPage>6){
        newPage = 6;
    }
    curPage = newPage;
    var newMarginTop = newPage * (-pageHeight);
    $(".container").css({
        "-webkit-transform" : "matrix(1, 0, 0, 1, 0, "+newMarginTop+")"
    });

    var newTop = -parseInt(curPage*pageHeight*(lineHeight/secHeight));
    $(".line").css({
        "-webkit-transform" : "matrix(1, 0, 0, 1, 0, "+newTop+")"
    });

    movePrevent = true;
    setTimeout(function(){
    	if(curPage == 1) {
    		$(".container").addClass("js-disabled-scroll");
    	}
    	movePrevent=false;
    	$(".js-scroll").attr("style","");
    	$(".js-scroll").css("height",pageHeight);
    }, 300 );

    // 每页动画
    /*
    if( !$(pages[curPage]).hasClass("sec0" + (curPage+1) + "_show") ){
        $(pages[curPage]).addClass("sec0" + (curPage+1) + "_show");
    }
    $(pages[curPage-1]).removeClass("sec0" + (curPage) + "_show");
    $(pages[curPage+1]).removeClass("sec0" + (curPage+2) + "_show");
*/
}



/*****************************************/
var $sec1 = $(".sec-1")
,	$secBegin = $(".sec-begin")
,	$secTest = $(".sec-test")
,	$secResult = $(".sec-result")
,	$secSwitch = $(".sec-switch")
,	$secSlogan = $(".sec-slogan")
,	$secEnd = $(".sec-end")
,	pageW = $(window).width()
,	$allArr = $(".arrow")
,	score = 0
,	shareDesc
,	$shareMask = $("#shareMask")
,	$shareBtn = $("#js-share-button")
;
	
$(".btn-pull").on("click",function(){
	var $run = $sec1.find(".run")
	,	$runing = $sec1.find(".running")
	,	$logo = $sec1.find(".logo")
	,	$runText = $sec1.find(".run-text")
	,	$mask = $sec1.find(".mask")
	,	$arrow = $sec1.find(".arrow")
	,	$subTitle = $sec1.find(".sub-title")
	;
	
	$(this).hide();
	$run.hide();
	$runing.show();
	$subTitle.css({"opacity":0});
	
	$logo.animate({
		top:-700
	},500);
	$runText.animate({
		top:-700
	},500);
	$runing.animate({
		left:pageW
	},1000*5);
	$mask.animate({
		left:pageW
	},1000*5, function(){
		$sec1.addClass("sec-showac1");
		setTimeout(function(){
			//$sec1.addClass("sec-showac2");
		}, 1000*2);
		$arrow.show();
		$(".container").removeClass("js-disabled-scroll");
	});
	
});


$(".btn-begin").on("click", function(){
	animatePage(2);
});
$shareBtn.on("click", function(){
	$shareMask.show();	
});
$shareMask.on("click", function(){
	$shareMask.hide();
});
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

$secTest.find(".answer").on("click", function(){
	var curScore = $(this).data("score");
	var $que = $(this).parents(".que");
	
	
	score += parseInt(curScore);
	if($que.hasClass("last")) {
		$secTest.hide();
		showResult(score);
		$(".container").removeClass("js-disabled-scroll");
	} else {
		$que.hide().next().show();
	}
	
});

function showResult(score){
	var rule = [23,33,43,53,61];
	var styResult = ["result-r1","result-r2","result-r3","result-r4","result-r5"];
	var $resultText = $secResult.find(".result");
	var result = [
		  '<p class="result-score">你的测试是'+score+'分<br> 压力指数20% </p> <p class="result-tips"> 只是一点小疲惫，你需要经常到户外散步或慢跑来让自己放松心情。 </p>'
		, '<p class="result-score">你的测试是'+score+'分<br> 压力指数40% </p> <p class="result-tips"> 有些轻度疲惫，你需要每天坚持跑行锻炼20分钟，让自己缓解压力寻回健康。 </p>'
		, '<p class="result-score">你的测试是'+score+'分<br> 压力指数60% </p> <p class="result-tips"> 疲惫的程度有些严重，每天跑步30分钟，呼吸些新鲜的空气。</p>'
		, '<p class="result-score">你的测试是'+score+'分<br> 压力指数80% </p> <p class="result-tips"> 属于身心疲惫，每天慢速长跑45分钟，释放活力，寻回自我。 </p>'
		, '<p class="result-score">你的测试是'+score+'分<br> 压力指数95% </p> <p class="result-tips"> 属于重度的身心疲惫，每天迎风奔跑1小时，烦恼将随风一起消逝。 </p>'
	];
	var desc =[
		  '我的压力指数是20%,只是一点小疲惫，需要经常到户外散步或慢跑来让自己放松心情。'
		, '我的压力指数是40%,有些轻度疲惫，需要每天坚持跑行锻炼20分钟，让自己缓解压力寻回健康。'
		, '我的压力指数是60%,疲惫的程度有些严重，需要每天跑步30分钟，呼吸些新鲜的空气。'
		, '我的压力指数是80%,属于身心疲惫，需要每天慢速长跑45分钟，释放活力，寻回自我。'
		, '我的压力指数是95%,属于重度的身心疲惫，需要每天迎风奔跑1小时，烦恼将随风一起消逝。'
	];
	
	
	for(var i=0,len=rule.length; i < len; i++) {
		if(score < rule[i]) {
			$secResult.find(".result").html(result[i]);
			shareDesc = desc[i];
			//$resultText.addClass(styResult[i]);
			break;
		}
	}
}

function showSlogan(MaxNum) {
	var MaxNum = MaxNum || 6
	,	ranNum = parseInt(Math.random()*(MaxNum+1))
	,	$slogan = $secSlogan
	,	i
	,	len = 2
	,	curIndex
	,	$curEle
	;
	
	for(i=0; i<len; i++) {
		curIndex = ranNum + i;
		if(curIndex < MaxNum) {
			$curEle = $slogan.eq(curIndex).show().removeClass("hide");
		} else {
			$curEle= $slogan.eq(curIndex - MaxNum).show().removeClass("hide");
		}
		
		$curEle.addClass("curSlogan");
		$curEle.addClass("js-scroll");
	}
	
	$(".curSlogan").eq(len-1).addClass("lastSlogan");
	
}
function showText($ele) {
	var $paragraph = $ele.find("p");
	var len = $paragraph.length;
	var i=0;
	
	$paragraph.hide();
	
	var timmer = setInterval(function(){
		if(i>len-1) {
			clearInterval(timmer);
			timmer = null;
		}
		$paragraph.eq(i).show();
		i++;
	},(i+1)*500);
}

function getDesc(){
	var desc = mainDesc= shareDesc || "测测你是不是一个容易崩溃的人";
	return desc;
}
function onBridgeReady() {
	var t = new Date().getTime(),
		mainTitle="奔跑吧兄弟",
	    mainDesc= shareDesc || "测测你是不是一个容易崩溃的人",
	    mainURL="http://dev.hotkeypower.com/lfhtml/run3/views/run.html?v7",
	    mainImgUrl= "http://dev.hotkeypower.com/lfhtml/run3/images/run_share.jpg";
	
	//转发朋友圈
	WeixinJSBridge.on("menu:share:timeline", function(e) {
		mainDesc = getDesc();
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
		mainDesc = getDesc();
	    WeixinJSBridge.invoke("shareWeibo", {
	        "content": mainDesc,
	        "url": mainURL
	    }, function(res) {
	        WeixinJSBridge.log(res.err_msg);
	    });
	});
	//分享给朋友
	WeixinJSBridge.on('menu:share:appmessage', function(argv) {
		mainDesc = getDesc();
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