##开发环境##
###目前的现状###
除了司法之外，其它所有的项目都在使用seajs。开发时使用使用require加载不同的模块
```javascript
	require("./mod/msg.js");
	
```

+ msg.js
```javascript
	define(function(require, exports, module) {
		exports.msg = function(message){
		alert(message);
		};
	}
	
```
	
+ 加载页面时会每个模块分别加载，增加多个请求数

通过合并来减少请求数

