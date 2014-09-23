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
}


document.body.addEventListener('touchstart', function (e) {
    //console.log("target:"+e.target.className);
    e = e.changedTouches[0];
    onStart(e);
});

document.body.addEventListener('touchmove', function (e) {
    onMove(e.changedTouches[0], e);
});

document.body.addEventListener('touchend', function (e) {
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
    if(newPage>$(".wrapper section").length-1){
        newPage = $(".wrapper section").length-1;
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
    setTimeout("movePrevent=false;", 300 );

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
,	score = 0;
;
	
$(".btn-pull").on("click",function(){
	var $run = $sec1.find(".run")
	,	$runing = $sec1.find(".running")
	,	$logo = $sec1.find(".logo")
	,	$runText = $sec1.find(".run-text")
	,	$mask = $sec1.find(".mask")
	,	$arrow = $sec1.find(".arrow")
	;
	
	$(this).hide();
	$run.hide();
	$runing.show();
	
	$logo.animate({
		top:-700
	},500);
	$runText.animate({
		top:-700
	},500);
	$runing.animate({
		left:pageW
	},1000*8);
	$mask.animate({
		left:pageW
	},1000*8, function(){
		$arrow.show();
	});
	
});

$allArr.on("click",function(){
	var $section = $(this).parents(".sec");
	var $slogan = $(this).parents(".slogan");
	
	// 如果是过度页的话
	if($section.hasClass("sec-switch")) {
		showSlogan();
		$section.hide();
		showText($(".curSlogan").eq(0));
	}
	else if ($section.hasClass("sec-slogan")) {
		showText($slogan.next(".curSlogan"));
		if($slogan.hasClass("lastSlogan")) {
			$section.hide();
		} else {
			$slogan.hide();
		}
	} else {
		$section.hide();
	}
});

$secBegin.find(".btn-enter").on("click", function(){
	$secBegin.hide();
});

$secTest.find(".opts").on("click", function(){
	var curScore = $(this).data("score");
	var $que = $(this).parents(".que");
	
	
	score += parseInt(curScore);
	if($que.hasClass("last")) {
		$secTest.hide();
		showResult(score);
	} else {
		$que.hide().next().show();
	}
	
});

function showResult(score){
	var rule = [23,33,43,53,61];
	var styResult = ["result-r1","result-r2","result-r3","result-r4","result-r5"];
	var $resultText = $secResult.find(".result");
	
	$secResult.find(".score").text(score);
	
	for(var i=0,len=rule.length; i < len; i++) {
		if(score < rule[i]) {
			$resultText.addClass(styResult[i]);
			break;
		}
	}
}

function showSlogan(MaxNum) {
	var MaxNum = 9
	,	ranNum = parseInt(Math.random()*(MaxNum+1))
	,	$slogan = $secSlogan.find(".slogan")
	,	i
	,	len = 3
	,	curIndex
	,	$curEle
	;
	
	for(i=0; i<len; i++) {
		curIndex = ranNum + i;
		if(curIndex < MaxNum) {
			$curEle = $slogan.eq(curIndex).show();
		} else {
			$curEle= $slogan.eq(curIndex - MaxNum).show();
		}
		
		$curEle.addClass("curSlogan");
	}
	
	$secSlogan.find(".curSlogan").eq(len-1).addClass("lastSlogan");
	
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

function onBridgeReady() {
	var t = new Date().getTime(),
		mainTitle="奔跑吧兄弟",
	    mainDesc="《奔跑吧兄弟》是浙江卫视全新推出的大型户外竞技真人秀节目",
	    mainURL="http://dev.hotkeypower.com/lfhtml/running/views/run.html?v=" + t,
	    mainImgUrl= "http://dev.hotkeypower.com/lfhtml/running/images/run_share.png";
	
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