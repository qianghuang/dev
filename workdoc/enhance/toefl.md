##toefl静态项目说明##
###开发环境的搭建###
+ nodejs的安装
+ grunt-cli的安装
+ grunt-init 的安装
+ 创建项目

###目录说明###
+ css
+ images
+ js
+ tpl

###common.css###
####base.css####
+ 字体大小12-15px,16-36px偶数值:  .g-f12,g-f13,...
+ 清除浮动: .g-clearfix
+ 高亮 :   .g-hl-1:链接蓝，.g-hl-2:绿色，g-hl-3：红色
+ 灰度 :   .g-g3:#333; g-g9:#999; g-g6:#666;
+ 头像大小： .g-avatar-50, .g-avatar-30
+ 常用两列布局:

``` html
	<div class="g-kmf-wrapper">
		<div class="kmf-maincol">710</div>
		<div class="kmf-asidecol">250</div>
	</div>
	
```

+ 浮动： g-floatright, g-floatleft
+ hover所有属性过度变化：g-anim

####button.css####
+ 统一的蓝色按钮:g-btn-normal
+ 统一的灰色按钮:g-btn-lower
+ 统一的橙色按钮:g-btn-strong
+ 统一的禁用按钮:增加 g-btn-disabled

```html
	<a class="g-btn-normal">常用的按钮</a>
	<a class="g-btn-lower">弱化的按钮</a>
	<a class="g-btn-strong">加强的按钮</a>
	<a class="g-btn-lower g-btn-disabled">禁用的按钮</a>
	
```

####form.css####
自定义的radio与checkbox

``` html
	<ul class="g-kmf-form js-kmf-form exam-options check">
		<li class="normal">
			<span class="g-formbg g-checkbox"><input type="checkbox" checked="checked" value="1" class="g-hide" name="sections[]"></span>阅读
		</li>
	</ul>

```

####widget.css####
全站小模块样式
+ 进度条 : sifa
+ 练习册 : sifa
+ title、alt: toefl
+ feedback :toefl

####page.css####
新版的页面样式
####dialog.css####
 全站通用的弹窗样式 
+ alert,confirm
+ 登录弹层

####header.css####
 全站通用的header样式 
 
####subject-header.css####
 科目的header样式 
 
####navigator.css####
 全局的头部导航 
 
####footer-service.css####
 全站通用的footer-service样式 
 
####footer.css####
 全站通用的footer样式 

####footer-simple.css####
 全站通用的简易footer样式 

****

###common.js###
全站引用的相关js

+ json2
+ jquery.cookie
+ template
+ form:自定义的radio/checkbox
+ kmf-tips:自定义的tooltips，[详情](http://con.enhance.cn:8081/pages/viewpage.action?pageId=4751601)
+ kmf-alert:自定义的alert与comfirm，[详情](http://con.enhance.cn:8081/pages/viewpage.action?pageId=4751615)
+ dialog-login: 登录弹层，[详情](http://con.enhance.cn:8081/pages/viewpage.action?pageId=4751564)
+ kmf-warn：全站强提醒，[详情](http://con.enhance.cn:8081/pages/viewpage.action?pageId=4751584)
+ feedback：意见反馈浮层

****

###toefl###
####pub.css####
托福项目中公用的样式模块，所有的样式文件都包含此模块,主要样式包括：
+ toefl公用的图标
+ 划词的样式
+ 面包屑的样式

```html
	<div class="i-toefl-crumb">
        <ul class="list g-clearfix">
            <li><a href="/">首页</a></li>
            <li class="split">&#8250;</li>
            <li><a href="/learn">学习</a></li>
            <li class="split">&#8250;</li>
            <li>托福考试简介</li>
        </ul>
    </div>
	
```
+ 登录提示
+ 底部用户登录模块
+ 新版打卡

####几个听力相关的js####



###toefl开发时存在的问题###
+ 项目间的依赖问题
+ 项目目录存在的不合理
+ 



