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
