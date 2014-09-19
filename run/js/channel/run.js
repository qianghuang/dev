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
}
initPage();

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
	,	$mask = $sec1.find(".mask")
	,	$arrow = $sec1.find(".arrow")
	;
	
	$(this).hide();
	$run.hide();
	$runing.show();
	
	$logo.animate({
		top:-700
	},500);
	$runing.animate({
		left:pageW
	},1000*4);
	$mask.animate({
		left:pageW
	},1000*4, function(){
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
