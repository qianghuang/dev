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
		var that = $(this)
		,	_code = $.trim(that.val())
		,	_beginCode = 'var beginTime = performance.now();'
		,	_endCode = 'var endTime = performance.now(); var totalTime = endTime - beginTime;'
		,	_newCode
		;
		
		if(_code === "") {
			return;
		}
		_newCode = [_beginCode, _code, _endCode].join("");
		try {
			eval(_newCode);
			that.parents(cssSelItem).find(cssSelShow).html(totalTime.toFixed(2) + "ms");
		} catch(e) {
			that.parents(cssSelItem).find(cssSelShow).html("error!");
		}
		
	}
});
