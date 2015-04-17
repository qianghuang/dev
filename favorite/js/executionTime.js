var $wrapper = $("#js-code-wraper")
,	$codeEditor = $wrapper.find(".in-code")
,	cssSelItem = ".item"
,	cssSelShow = ".show"
;

$codeEditor.on({
	"focus": function(){
		var a = performance.now();
	},
	"blur": function(){
		$codeEditor.each(function(){
			var that = $(this)
			,	_code = $.trim(that.val())
			,	_beginCode = 'var execuBeginTime = performance.now();'
			,	_endCode = 'var execuEndTime = performance.now(); var execuTotalTime = execuEndTime - execuBeginTime;'
			,	_newCode
			,	_total
			;
			
			if(_code === "") {
				that.parents(cssSelItem).find(cssSelShow).html("");
				return;
			}
			_newCode = [_beginCode, _code, _endCode].join(";");
			
			_total = execu(_newCode);
			if(_total > -1) {
				that.parents(cssSelItem).find(cssSelShow).html(_total.toFixed(2) + "ms");
			} else if (_total == -1){
				that.parents(cssSelItem).find(cssSelShow).html("error!");
			}
		});
		
	}
});

function execu(codeStr){
	try {
		eval(codeStr);
		return execuTotalTime;
	} catch(e) {
		return -1;
	}
}
