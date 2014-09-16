var i = 0;
var scene = 1;
var maxScene = 3;
var doing = false;
var winWidth = document.documentElement.clientWidth;
$(".scene").css({width:winWidth});

document.addEventListener("touchstart", function(){
	if(doing) {
		return;
	}
	if(scene == maxScene) {
		return ;
	}
	doing = true;
	i++;
	var end = 100 - 20*i;
	var endWidth = end + "%";
	var $ele = $(".sec-"+scene);
	var $walk = $ele.find(".walk");
	$walk.addClass("walking");
	$ele.stop(true, false).animate({
		width:endWidth
	},800, function(){
		$walk.removeClass("walking");
		if(end == 0) {
			scene++;
			$(".sec-"+scene).find(".walk").show();
			$(".sec-"+scene).find(".aside").show();
			i=0;
		}
		doing = false;
	});
},false);