require=function t(e,i,n){function c(s,a){if(!i[s]){if(!e[s]){var u="function"==typeof require&&require;if(!a&&u)return u(s,!0);if(o)return o(s,!0);var l=new Error("Cannot find module '"+s+"'");throw l.code="MODULE_NOT_FOUND",l}var r=i[s]={exports:{}};e[s][0].call(r.exports,function(t){var i=e[s][1][t];return c(i?i:t)},r,r.exports,t,e,i,n)}return i[s].exports}for(var o="function"==typeof require&&require,s=0;s<n.length;s++)c(n[s]);return c}({ButtonScaler:[function(t,e,i){"use strict";cc._RFpush(e,"65efexAg0dH8akwneupAWqc","ButtonScaler"),cc.Class({"extends":cc.Component,properties:{pressedScale:1,transDuration:0},onLoad:function(){function t(t){this.stopAllActions(),this.runAction(i.scaleDownAction)}function e(t){this.stopAllActions(),this.runAction(i.scaleUpAction)}var i=this;i.initScale=this.node.scale,i.button=i.getComponent(cc.Button),i.scaleDownAction=cc.scaleTo(i.transDuration,i.pressedScale),i.scaleUpAction=cc.scaleTo(i.transDuration,i.initScale),this.node.on("touchstart",t,this.node),this.node.on("touchend",e,this.node),this.node.on("touchcancel",e,this.node)}}),cc._RFpop()},{}],HelloWorld:[function(t,e,i){"use strict";cc._RFpush(e,"280c3rsZJJKnZ9RqbALVwtK","HelloWorld"),cc.Class({"extends":cc.Component,properties:{label:{"default":null,type:cc.Label},particle:{"default":null,type:cc.Node},text:"Hello, weige!"},onLoad:function(){this.label.string=this.text,this.particle.active=!1,this.node.on(cc.Node.EventType.TOUCH_START,function(t){this.particle.position=t.getLocation(),this.particle.active=!0},this),this.node.on(cc.Node.EventType.TOUCH_MOVE,function(t){this.particle.position=t.getLocation()},this),this.node.on(cc.Node.EventType.TOUCH_END,function(t){this.particle.x=9999},this)},update:function(t){}}),cc._RFpop()},{}],MenuManager:[function(t,e,i){"use strict";cc._RFpush(e,"d9ae4yNFTxHu7WlYAlo8dXB","MenuManager"),cc.Class({"extends":cc.Component,properties:{bg1Ani:{"default":null,type:cc.Animation},bg2Ani:{"default":null,type:cc.Animation},bg3Ani:{"default":null,type:cc.Animation},bg4Ani:{"default":null,type:cc.Animation},bg1:{"default":null,type:cc.Node},bg2:{"default":null,type:cc.Node},bg3:{"default":null,type:cc.Node},bg4:{"default":null,type:cc.Node}},statusBg1:function(){this.bg1Ani.play("bg1_run"),this.bg1.active=!0,this.bg2.active=!1,this.bg3.active=!1,this.bg4.active=!1},statusBg2:function(){this.bg2Ani.play("bg2_run"),this.bg1.active=!1,this.bg2.active=!0,this.bg3.active=!1,this.bg4.active=!1},statusBg3:function(){this.bg3Ani.play("bg3_run"),this.bg1.active=!1,this.bg2.active=!1,this.bg3.active=!0,this.bg4.active=!1},statusBg4:function(){this.bg4Ani.play("bg4_run"),this.bg1.active=!1,this.bg2.active=!1,this.bg3.active=!1,this.bg4.active=!0},statusBg5:function(){this.bg1.active=!1,this.bg2.active=!1,this.bg3.active=!1,this.bg4.active=!1},onLoad:function(){this.bg1.active=!1,this.bg2.active=!1,this.bg3.active=!1,this.bg4.active=!1}}),cc._RFpop()},{}]},{},["HelloWorld","ButtonScaler","MenuManager"]);