##开发环境##
###目前的现状###
除了司法之外，其它所有的项目都在使用seajs。开发时使用使用require加载不同的模块
	require("./mod/msg.js");
+ msg.js
	define(function(require, exports, module) {
		
		exports.msg = function(message){
			alert(message);
		};
	}

