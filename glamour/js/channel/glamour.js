Zepto(function($){
	var $banners = $("#js-banners .img-banner");
	var $qa = $(".js-qa");
	var $qalist = $qa.find("li");
	var result = {
		a:0,
		b:0,
		c:0
	};
	var answered = {};
	var totalPage = 10;
	
	function goResult(data) {
		var maxValue = Math.max(data.a, data.b, data.c);
		
		if(data.a == maxValue) {
			location.href = "result_a.html";
		} else if (data.b == maxValue) {
			location.href = "result_b.html";
		} else {
			location.href = "result_c.html";
		}
		
	}
	
	$qalist.bind("click", function(){
		var qasn = parseInt($(this).attr("qasn"));
		var curIndex = qasn-1;
		var nextIndex = qasn;
		var curResult = $(this).find('input').val();
		
		if(answered[curIndex]) {
			return ;
		}
		answered[curIndex] = curResult;
		
		result[curResult]++;
		if(nextIndex == 10) {
			goResult(result);
			return;
		}
		
		$banners.eq(curIndex).addClass('img-hide');
		$banners.eq(nextIndex).removeClass('img-hide');
		$qa.eq(curIndex).hide();
		$qa.eq(nextIndex).show();
		$('body').scrollTop(0);
	});
	
});

