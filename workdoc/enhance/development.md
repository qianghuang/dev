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
+ gmat项目的js最终合并成一个js文件,ex:gmat.js
```javascript
seajs.use("gmat.js");
```
<p>优点：减少请求数，缓存</p>
<p>
缺点：对于开发增加难度，由于seajs的调用模块的特点，不同页面使用相应的模块，这种统一合并后，无法正常使用，gmat根据不同url加载不同的模块来解决这个问题，但还是过于依赖url,如果人员变动，新人的学习成本相对较高
</p>
+ toefl项目的将js进行拆分，主要分为所有项目公用script,本项目公用script,当前页面所使用的script
```javascript
seajs.use(["common/js/channel/common","toefl/js/channel/toefl"]);
```
优点：
