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
<p>
优点：减少请求数，首次请求后缓存js文件,模块化开发的优点
</p>
<p>
缺点：对于开发增加难度，由于seajs的调用模块的特点，不同页面使用相应的模块，这种统一合并后，无法正常使用，gmat根据不同url加载不同的模块来解决这个问题，但还是过于依赖url,如果人员变动，新人的学习成本相对较高
</p>
+ toefl项目的将js进行拆分，主要分为所有项目公用script,本项目公用script,当前页面所使用的script
```javascript
seajs.use(["common/js/channel/common","toefl/js/channel/toefl"]);
```
<p>
优点：条理相对清晰，方便给后端提供接口方法
</p>
<p>
缺点：在js与css合并的配置上不是很方便，有待于改善
</p>
+ toefl项目新增加了ssh任务、监听任务与拷贝任任
<p>
提交代码命令
</p>
```
 grunt push-dev    #上传开发机
 grunt online      #上传线上
```
+ toefl项目的源代码与输出文件是完全分开，包括图片，js及样式文件，而gmat图片是公用的
+ 其它的细微差别在于grunt任务的配置上
<p>
grunt-cmd-transport
</p>
<p>
grunt-cmd-concat
</p>
+ 调试
<p>
toefl项目方式 的开发环境，需要在本地搭建web服务器，也是为了方便测试与调试，gmat在这调试方面不是很方便，特别是在线上环境，如果将来增加测试环境更是如此
</p>
####讨论####
提出几个问题，大家可以讨论一下
+ 如果按gmat项目的方式，然后拆分样式与js会怎么样？
+ cssmin,uglify,ssh任务是否放到公用配置中？
+ 是否要在项目中使用less?
