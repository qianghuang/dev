define(['lib/link','lib/action','host1','host2','host3','host4','host5','shine'],function($,action,host1,host2,host3,host4,host5,shine){return{init:function(){var newDate=Date.now();var diedname="";var screenW,screenH,menuH=640,menuDy;if(!$.canvas.screen.getTouch()){window.onresize=function(){screenW=window.innerWidth;screenH=window.innerHeight;$.canvas.screen.setWidth(screenW).setHeight(screenH);menuDy=(screenH-menuH)>>1;};window.onresize();}
else{screenW=window.innerWidth;screenH=window.innerHeight;$.canvas.screen.setWidth(screenW).setHeight(screenH);menuDy=(screenH-menuH)>>1;}
var getTimeStr=function(time,per){var m=~~(time/1000%1*1000);if(m==0){m='000';}
else if(m<100){m+='0';}
return~~(time/1000)+'.'+m+(per||'\"');};$.run(function(){var _newDate=Date.now();$.canvas.fillStyle('#FFF').fillScreen();var _sceneH=~~(menuH/game.scenes.length);if(!game.died){game.time=_newDate-game.date;for(var i=0,scene;scene=game.scenes[i];i++){scene.action(0,menuDy+(i+1)*_sceneH,screenW,_sceneH,-8).render();if(scene.hostDied){diedname=scene.name;game.died=true;game.dieDate=Date.now();game.shine=shine.get(0).mark(scene.host.x,scene.host.y-20).setStep(2);break;}}}
else{for(var i=0,scene;scene=game.scenes[i];i++){scene.host.action();scene.render();}
if(game.shine){game.shine.action().render();if(game.shine.getSprite().endFrame()){game.shine=null;}}
if(_newDate-game.dieDate>=game.dieTimeout){game.dieDate=null;gameover(diedname);}}
var _timeStr=getTimeStr(game.time);$.canvas.fillStyle('#000').font('30px Arial').fillText(_timeStr,screenW-$.canvas.measureText(_timeStr).width-20,50);_newDate=null;}).menu(function(){$.canvas.fillStyle('#FFF').fillScreen().drawImage('logo',(screenW-480)>>1,menuDy).drawImage('btns1',0,99,480,7,(screenW-480)>>1,menuDy+140,480,7).drawImage('btns1',0,99,480,7,(screenW-480)>>1,menuDy+555,480,7);if($.buttonLayout.released('difficulty1')){game.moduleName='越狱二人组模式';start(2);}
else if($.buttonLayout.released('difficulty2')){game.moduleName='越狱三人组模式';start(3);}
else if($.buttonLayout.released('difficulty3')){game.moduleName='越狱四人组模式';start(4);}
else if($.buttonLayout.released('difficulty4')){game.moduleName='越狱五人组模式';start(5);}
else if($.buttonLayout.released('rank')){dp_Ranking();}}).zone(function(){$.canvas.fillStyle('#F00').fillScreen().fillStyle('#FFF').drawString(game.moduleName,0,menuDy+110,$.graphics.VCENTER,false,null,null,'50px 微软雅黑').drawImage('btns1',0,106,480,7,(screenW-480)>>1,menuDy+140,480,7).drawImage('btns1',0,106,480,7,(screenW-480)>>1,menuDy+555,480,7).fillStyle('#000').drawString(getTimeStr(game.time,'秒'),0,menuDy+340,$.graphics.VCENTER,false,null,null,'60px 微软雅黑').fillStyle('#000').drawString('最佳:'+getTimeStr(game.bestTime,'秒'),0,menuDy+400,$.graphics.VCENTER,false,null,null,'30px 微软雅黑');if(game.time>game.bestTime){$.canvas.fillStyle('#FF0').drawString('新纪录',0,menuDy+240,$.graphics.VCENTER,false,null,null,'50px 微软雅黑');}
if($.buttonLayout.released('return')){init();}
else if($.buttonLayout.released('restart')){start(game.module);}}).events.mouseDown(function(e,offX,offY){if(game.died){return false;}
for(var i=0,scene;scene=game.scenes[i];i++){scene.touchStart(offX,offY);}}).touchStart(function(e,offX,offY){if(game.died){return false;}
for(var i=0,scene;scene=game.scenes[i];i++){scene.touchStart(offX,offY);}});var init=function(){$.buttonLayout.clear().create({id:'difficulty1',value:'越狱2人组',x:(screenW-272)>>1,y:menuDy+160,width:272,height:80,font:'36px 微软雅黑',imageId:'btns1',sx:0,sy:0,color:'#FFF',hx:272,hy:0,hColor:'#FFF',dex:272,dey:0,deColor:'#000'}).create({id:'difficulty2',value:'越狱3人组',x:(screenW-272)>>1,y:menuDy+160+100,width:272,height:80,font:'36px 微软雅黑',imageId:'btns1',sx:0,sy:0,color:'#FFF',hx:272,hy:0,hColor:'#FFF',dex:272,dey:0,deColor:'#000'}).create({id:'difficulty3',value:'越狱4人组',x:(screenW-272)>>1,y:menuDy+160+100*2,width:272,height:80,font:'36px 微软雅黑',imageId:'btns1',sx:0,sy:0,color:'#FFF',hx:272,hy:0,hColor:'#FFF',dex:272,dey:0,deColor:'#000'}).create({id:'difficulty4',value:'越狱5人组',x:(screenW-272)>>1,y:menuDy+160+100*3,width:272,height:80,font:'36px 微软雅黑',imageId:'btns1',sx:0,sy:0,color:'#FFF',hx:272,hy:0,hColor:'#FFF',dex:272,dey:0,deColor:'#000'}).create({id:'rank',value:'',x:(screenW-55)>>1,y:menuDy+580,width:55,height:55,imageId:'btns1',sx:0,sy:113,color:'#FFF',hx:0,hy:113,hColor:'#FFF',dex:0,dey:113,deColor:'#000'}).base().gameFlow.menu();};init();var game={moduleName:'',module:0,time:0,bestTime:0,date:null,died:false,dieTimeout:1000,dieDate:null,scenes:[],shine:null,Scene:$.extend(function(id){this.id=id;this.x=0;this.baseY=0;this.width=0;this.height=0;var _host,_name;switch(id){case 0:_host=host1;_name='李代沫';break;case 1:_host=host2;_name='黄海波';break;case 2:_host=host3;_name='郭美美';break;case 3:_host=host4;_name='张耀扬';break;case 4:_host=host5;_name='房祖名';break;default:_host=host1;_name='?';break;}
this.name=_name;this.host=_host.get().setStep(2);this.hostDied=false;this.boxes=[];this.displayDate=Date.now();this.displayTimeout=$.comm.getRandom(1000,2000);},null,{render:function(){$.canvas.fillStyle('#000').fillRect(this.x,this.baseY-5,this.width,5);for(var i=this.boxes.length-1,box;box=this.boxes[i];i--){$.canvas.fillRect(box.x,box.y,box.width,box.height);}
this.host.render();return this;},action:function(x,baseY,width,height,speed){this.x=x;this.baseY=baseY;this.width=width;this.height=height;if(!this.hostDied){if(this.host.endPath()){this.host.mark(this.x+100,this.baseY-5);}
var _newDate=Date.now();if(_newDate-this.displayDate>=this.displayTimeout){this.displayDate=_newDate;var randomW=$.comm.getRandom(5,30),randomH=$.comm.getRandom(10,50);this.boxes.unshift({x:this.width,y:0,width:randomW,height:randomH});this.displayTimeout=$.comm.getRandom(1000,3000);randomW=randomH=null;}
for(var i=this.boxes.length-1,box;box=this.boxes[i];i--){box.x+=speed;box.y=this.baseY-5-box.height;if(this.host.collisionInput(box.x,box.y,box.width,box.height,'bR')){this.hostDied=true;this.host.clearPath();}
if(box.x<=-box.width||box.x>=this.width){this.boxes.splice(i,1);}}
_newDate=null;}
this.host.action();return this;},touchStart:function(offX,offY){if(!this.host.endPath()){return this;}
if($.comm.collision(offX,offY,1,1,this.x,this.baseY-this.height,this.width,this.height)){this.host.setPath([[0,-20],[0,-20],[0,-20],[0,-10],[0,-10],[0,-10],[0,-5],[0,-5],[0,-5],[0,5],[0,5],[0,5],[0,10],[0,10],[0,10],[0,20],[0,20],[0,20]]);}
return this;}})};var start=function(num){$.buttonLayout.clear().base().gameFlow.run();game.died=false;game.scenes=[];game.time=0;game.date=Date.now();game.shine=null;game.module=num;for(var i=0;i<num;i++){game.scenes.push(new game.Scene(i));}};var gameover=function(name){var _btnDx=(screenW-480)>>1;$.buttonLayout.clear().create({id:'return',value:'返回',bgColor:'',bgStroke:'',stroke:'',x:_btnDx+100,y:menuDy+580,width:100,height:80,font:'36px 微软雅黑',imageId:'',sx:0,sy:0,color:'#FFF',hx:272,hy:0,hColor:'#AAA',dex:272,dey:0,deColor:'#CCC'}).create({id:'restart',value:'重来',bgColor:'',bgStroke:'',stroke:'',x:_btnDx+280,y:menuDy+580,width:100,height:80,font:'36px 微软雅黑',imageId:'',sx:0,sy:0,color:'#FFF',hx:272,hy:0,hColor:'#AAA',dex:272,dey:0,deColor:'#CCC'}).base().gameFlow.zone();var _bestTime=$.localStorage.getItem('NotDieAnyoneBestTime'+game.module);if(_bestTime==null){_bestTime='0';}
game.bestTime=parseInt(_bestTime);if(game.time>game.bestTime){$.localStorage.setItem('NotDieAnyoneBestTime'+game.module,game.time.toString());}
dp_getGameResulte(game.module,game.time*(game.module-1),function(resulte){window.shareData.timeLineLink=resulte.url;if(resulte.rank>0&&resulte.rank<=100)
window.shareData.Rankstr=",在全球玩家排名第"+resulte.rank;if(!resulte.concern){if(confirm("亲，你玩的这么好，快来关注我们【多泡游戏】，一起来挑战更多微信小游戏吧！^_^")){window.location.href="http://mp.weixin.qq.com/s?__biz=MjM5NjQ4NTU0MA==&mid=202267473&idx=1&sn=ee8c007caafdf34f03d90c3e405ca50e#rd";}}},0);document.title=window.shareData.tTitle="我在热播大片【监狱风云】挂在"+name+"身上了，赚了"+game.time*(game.module-1)+"分"+window.shareData.Rankstr+",谁有本事来挑战?";if(confirm("你挂在"+name+"身上了!坑同伴坑干爹坑亲爹坑队友，快把游戏推荐给朋友圈小伙伴们看看他们坑谁？")){share();}};}};});