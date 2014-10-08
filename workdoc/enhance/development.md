##开发环境介绍##
###目前的现状###
除了司法之外，其它所有的项目都在使用seajs。开发时使用require方法加载不同的模块，开发环境基本上是3种
+ gmat/gre/msg/pay/account/www
+ sifa
+ toefl

####seajs的使用####
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
	
+ 页面加载时需要将js模块转化成标准的cmd规范，接着合并js模块，最后压缩并发布

####css的管理####
样式的模块化通过css文件的import方法导入不同的模块，发布前进行合并与压缩，目前存在的两个方法
+ 使用less
+ 使用grunt-cssjoin

###两种开发环境的介绍###
以下主要说明以gmat为例的开发环境与toefl为例的两种开发环境
+ 两种方法都是通过grunt来自动转化合并及压缩js

