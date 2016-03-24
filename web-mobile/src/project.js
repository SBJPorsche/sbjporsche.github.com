require=function t(e,n,i){function o(s,r){if(!n[s]){if(!e[s]){var c="function"==typeof require&&require;if(!r&&c)return c(s,!0);if(a)return a(s,!0);var u=new Error("Cannot find module '"+s+"'");throw u.code="MODULE_NOT_FOUND",u}var l=n[s]={exports:{}};e[s][0].call(l.exports,function(t){var n=e[s][1][t];return o(n?n:t)},l,l.exports,t,e,n,i)}return n[s].exports}for(var a="function"==typeof require&&require,s=0;s<i.length;s++)o(i[s]);return o}({ActorRenderer:[function(t,e,n){"use strict";cc._RFpush(e,"1a792KO87NBg7vCCIp1jq+j","ActorRenderer");var i=t("Game"),o=t("Types"),a=t("Utils"),s=o.ActorPlayingState;cc.Class({"extends":cc.Component,properties:{playerInfo:{"default":null,type:cc.Node},stakeOnTable:{"default":null,type:cc.Node},cardInfo:{"default":null,type:cc.Node},cardPrefab:{"default":null,type:cc.Prefab},anchorCards:{"default":null,type:cc.Node},spPlayerName:{"default":null,type:cc.Sprite},labelPlayerName:{"default":null,type:cc.Label},labelTotalStake:{"default":null,type:cc.Label},spPlayerPhoto:{"default":null,type:cc.Sprite},spCountdown:{"default":null,type:cc.Sprite},labelStakeOnTable:{"default":null,type:cc.Label},spChips:{"default":[],type:cc.Sprite},labelCardInfo:{"default":null,type:cc.Label},spCardInfo:{"default":null,type:cc.Sprite},animFX:{"default":null,type:cc.Node},cardSpace:0},onLoad:function(){},init:function(t,e,n,o,a){this.actor=this.getComponent("Actor"),this.sgCountdown=null,this.turnDuration=o,this.playerInfo.position=e,this.stakeOnTable.position=n,this.labelPlayerName.string=t.name,this.updateTotalStake(t.gold);var s=t.photoIdx%5;this.spPlayerPhoto.spriteFrame=i.instance.assetMng.playerPhotos[s],this.animFX=this.animFX.getComponent("FXPlayer"),this.animFX.init(),this.animFX.show(!1),this.cardInfo.active=!1,this.progressTimer=this.initCountdown(),a&&(this.spCardInfo.getComponent("SideSwitcher").switchSide(),this.spPlayerName.getComponent("SideSwitcher").switchSide())},initDealer:function(){this.actor=this.getComponent("Actor"),this.animFX=this.animFX.getComponent("FXPlayer"),this.animFX.init(),this.animFX.show(!1)},updateTotalStake:function(t){this.labelTotalStake.string="$"+t},initCountdown:function(){var t=i.instance.assetMng.texCountdown.getTexture();this.sgCountdown=new _ccsg.Sprite(t);var e=new cc.ProgressTimer(this.sgCountdown);return e.setName("progressTimer"),e.setMidpoint(cc.p(.5,.5)),e.setType(cc.ProgressTimer.Type.RADIAL),this.playerInfo._sgNode.addChild(e),e.setPosition(cc.p(0,0)),e.setPercentage(0),e},startCountdown:function(){if(this.progressTimer){var t=cc.progressFromTo(this.turnDuration,0,100);this.progressTimer.runAction(t)}},resetCountdown:function(){this.progressTimer&&(this.progressTimer.stopAllActions(),this.progressTimer.setPercentage(0))},playBlackJackFX:function(){this.animFX.playFX("blackjack")},playBustFX:function(){this.animFX.playFX("bust")},onDeal:function(t,e){var n=cc.instantiate(this.cardPrefab).getComponent("Card");this.anchorCards.addChild(n.node),n.init(t),n.reveal(e);var i=cc.p(0,0),o=this.actor.cards.length-1,a=cc.p(this.cardSpace*o,0);n.node.setPosition(i);var s=cc.moveTo(.5,a),r=cc.callFunc(this._onDealEnd,this,this.cardSpace*o);n.node.runAction(cc.sequence(s,r))},_onDealEnd:function(t,e){this.resetCountdown(),this.actor.state===s.Normal&&this.startCountdown(),this.updatePoint(),this._updatePointPos(e)},onReset:function(){this.cardInfo.active=!1,this.anchorCards.removeAllChildren(),this._resetChips()},onRevealHoldCard:function(){var t=cc.find("cardPrefab",this.anchorCards).getComponent("Card");t.reveal(!0),this.updateState()},updatePoint:function(){switch(this.cardInfo.active=!0,this.labelCardInfo.string=this.actor.bestPoint,this.actor.hand){case o.Hand.BlackJack:this.animFX.show(!0),this.animFX.playFX("blackjack");break;case o.Hand.FiveCard:}},_updatePointPos:function(t){this.cardInfo.setPositionX(t+50)},showStakeChips:function(t){var e=this.spChips,n=0;t>5e4?n=5:t>25e3?n=4:t>1e4?n=3:t>5e3?n=2:t>0&&(n=1);for(var i=0;n>i;++i)e[i].enabled=!0},_resetChips:function(){for(var t=0;t<this.spChips.length;++t)this.spChips.enabled=!1},updateState:function(){switch(this.actor.state){case s.Normal:this.cardInfo.active=!0,this.spCardInfo.spriteFrame=i.instance.assetMng.texCardInfo,this.updatePoint();break;case s.Bust:var t=a.getMinMaxPoint(this.actor.cards).min;this.labelCardInfo.string="爆牌("+t+")",this.spCardInfo.spriteFrame=i.instance.assetMng.texBust,this.cardInfo.active=!0,this.animFX.show(!0),this.animFX.playFX("bust"),this.resetCountdown();break;case s.Stand:var e=a.getMinMaxPoint(this.actor.cards).max;this.labelCardInfo.string="停牌("+e+")",this.spCardInfo.spriteFrame=i.instance.assetMng.texCardInfo,this.resetCountdown()}}}),cc._RFpop()},{Game:"Game",Types:"Types",Utils:"Utils"}],Actor:[function(t,e,n){"use strict";cc._RFpush(e,"7d008dTf6xB2Z0wCAdzh1Rx","Actor");var i=t("Types"),o=t("Utils"),a=i.ActorPlayingState;cc.Class({"extends":cc.Component,properties:{cards:{"default":[],serializable:!1,visible:!1},holeCard:{"default":null,serializable:!1,visible:!1},bestPoint:{get:function(){var t=o.getMinMaxPoint(this.cards);return t.max}},hand:{get:function(){var t=this.cards.length;return this.holeCard&&++t,t>=5?i.Hand.FiveCard:2===t&&21===this.bestPoint?i.Hand.BlackJack:i.Hand.Normal}},canReport:{get:function(){return this.hand!==i.Hand.Normal},visible:!1},renderer:{"default":null,type:cc.Node},state:{"default":a.Normal,notify:function(t){this.state!==t&&this.renderer.updateState()},type:a,serializable:!1}},init:function(){this.ready=!0,this.renderer=this.getComponent("ActorRenderer")},addCard:function(t){this.cards.push(t),this.renderer.onDeal(t,!0);var e=this.holeCard?[this.holeCard].concat(this.cards):this.cards;o.isBust(e)&&(this.state=a.Bust)},addHoleCard:function(t){this.holeCard=t,this.renderer.onDeal(t,!1)},stand:function(){this.state=a.Stand},revealHoldCard:function(){this.holeCard&&(this.cards.unshift(this.holeCard),this.holeCard=null,this.renderer.onRevealHoldCard())},report:function(){this.state=a.Report},reset:function(){this.cards=[],this.holeCard=null,this.reported=!1,this.state=a.Normal,this.renderer.onReset()}}),cc._RFpop()},{Types:"Types",Utils:"Utils"}],AssetMng:[function(t,e,n){"use strict";cc._RFpush(e,"54522LcoVpPHbrqYgwp/1Qm","AssetMng");cc.Class({"extends":cc.Component,properties:{texBust:{"default":null,type:cc.SpriteFrame},texCardInfo:{"default":null,type:cc.SpriteFrame},texCountdown:{"default":null,type:cc.SpriteFrame},texBetCountdown:{"default":null,type:cc.SpriteFrame},playerPhotos:{"default":[],type:cc.SpriteFrame}}});cc._RFpop()},{}],AudioMng:[function(t,e,n){"use strict";cc._RFpush(e,"01ca4tStvVH+JmZ5TNcmuAu","AudioMng"),cc.Class({"extends":cc.Component,properties:{winAudio:{"default":null,url:cc.AudioClip},loseAudio:{"default":null,url:cc.AudioClip},cardAudio:{"default":null,url:cc.AudioClip},buttonAudio:{"default":null,url:cc.AudioClip},chipsAudio:{"default":null,url:cc.AudioClip},bgm:{"default":null,url:cc.AudioClip}},playMusic:function(){cc.audioEngine.playMusic(this.bgm,!0)},pauseMusic:function(){cc.audioEngine.pauseMusic()},resumeMusic:function(){cc.audioEngine.resumeMusic()},_playSFX:function(t){cc.audioEngine.playEffect(t,!1)},playWin:function(){this._playSFX(this.winAudio)},playLose:function(){this._playSFX(this.loseAudio)},playCard:function(){this._playSFX(this.cardAudio)},playChips:function(){this._playSFX(this.chipsAudio)},playButton:function(){this._playSFX(this.buttonAudio)}}),cc._RFpop()},{}],Bet:[function(t,e,n){"use strict";cc._RFpush(e,"28f38yToT1Pw7NgyeCvRxDC","Bet");var i=t("Game");cc.Class({"extends":cc.Component,properties:{chipPrefab:{"default":null,type:cc.Prefab},btnChips:{"default":[],type:cc.Node},chipValues:{"default":[],type:"Integer"},anchorChipToss:{"default":null,type:cc.Node}},init:function(){this._registerBtns()},_registerBtns:function(){for(var t=this,e=function(e){t.btnChips[n].on("touchstart",function(n){i.instance.addStake(t.chipValues[e])&&t.playAddChip()},this)},n=0;n<t.btnChips.length;++n)e(n)},playAddChip:function(){var t=cc.p(50*cc.randomMinus1To1(),50*cc.randomMinus1To1()),e=cc.instantiate(this.chipPrefab);this.anchorChipToss.addChild(e),e.setPosition(t),e.getComponent("TossChip").play()},resetChips:function(){i.instance.resetStake(),i.instance.info.enabled=!1,this.resetTossedChips()},resetTossedChips:function(){this.anchorChipToss.removeAllChildren()}}),cc._RFpop()},{Game:"Game"}],ButtonScaler:[function(t,e,n){"use strict";cc._RFpush(e,"a171dSnCXFMRIqs1IWdvgWM","ButtonScaler"),cc.Class({"extends":cc.Component,properties:{pressedScale:1,transDuration:0},onLoad:function(){function t(t){this.stopAllActions(),i&&i.playButton(),this.runAction(n.scaleDownAction)}function e(t){this.stopAllActions(),this.runAction(n.scaleUpAction)}var n=this,i=cc.find("Menu/AudioMng")||cc.find("Game/AudioMng");i&&(i=i.getComponent("AudioMng")),n.initScale=this.node.scale,n.button=n.getComponent(cc.Button),n.scaleDownAction=cc.scaleTo(n.transDuration,n.pressedScale),n.scaleUpAction=cc.scaleTo(n.transDuration,n.initScale),this.node.on("touchstart",t,this.node),this.node.on("touchend",e,this.node),this.node.on("touchcancel",e,this.node)}}),cc._RFpop()},{}],Card:[function(t,e,n){"use strict";cc._RFpush(e,"ab67e5QkiVCBZ3DIMlWhiAt","Card"),cc.Class({"extends":cc.Component,properties:{point:{"default":null,type:cc.Label},suit:{"default":null,type:cc.Sprite},mainPic:{"default":null,type:cc.Sprite},cardBG:{"default":null,type:cc.Sprite},redTextColor:cc.Color.WHITE,blackTextColor:cc.Color.WHITE,texFrontBG:{"default":null,type:cc.SpriteFrame},texBackBG:{"default":null,type:cc.SpriteFrame},texFaces:{"default":[],type:cc.SpriteFrame},texSuitBig:{"default":[],type:cc.SpriteFrame},texSuitSmall:{"default":[],type:cc.SpriteFrame}},init:function(t){var e=t.point>10;e?this.mainPic.spriteFrame=this.texFaces[t.point-10-1]:this.mainPic.spriteFrame=this.texSuitBig[t.suit-1],this.point.string=t.pointName,t.isRedSuit?this.point.node.color=this.redTextColor:this.point.node.color=this.blackTextColor,this.suit.spriteFrame=this.texSuitSmall[t.suit-1]},reveal:function(t){this.point.node.active=t,this.suit.node.active=t,this.mainPic.node.active=t,this.cardBG.spriteFrame=t?this.texFrontBG:this.texBackBG}}),cc._RFpop()},{}],CounterTest:[function(t,e,n){"use strict";cc._RFpush(e,"b0926/aIatATYgTuL0RyW/q","CounterTest"),cc.Class({"extends":cc.Component,properties:{target:{"default":null,type:cc.Label}},onLoad:function(){this.target.node.color=cc.Color.GREEN},update:function(t){}}),cc._RFpop()},{}],Dealer:[function(t,e,n){"use strict";cc._RFpush(e,"ce2dfoqEulHCLjS1Z9xPN7t","Dealer");var i=t("Actor"),o=t("Utils");cc.Class({"extends":i,properties:{bestPoint:{get:function(){var t=this.holeCard?[this.holeCard].concat(this.cards):this.cards,e=o.getMinMaxPoint(t);return e.max},override:!0}},init:function(){this._super(),this.renderer.initDealer()},wantHit:function(){var e=t("Game"),n=t("Types"),i=this.bestPoint;if(21===i)return!1;if(11>=i)return!0;var o=e.instance.player,a=e.instance._getPlayerResult(o,this);switch(a){case n.Outcome.Win:return!0;case n.Outcome.Lose:return!1}return this.bestPoint<17}}),cc._RFpop()},{Actor:"Actor",Game:"Game",Types:"Types",Utils:"Utils"}],Decks:[function(t,e,n){"use strict";function i(t){this._numberOfDecks=t,this._cardIds=new Array(52*t),this.reset()}cc._RFpush(e,"17024G0JFpHcLI5GREbF8VN","Decks");var o=t("Types");i.prototype.reset=function(){this._cardIds.length=52*this._numberOfDecks;for(var t=0,e=o.Card.fromId,n=0;n<this._numberOfDecks;++n)for(var i=0;52>i;++i)this._cardIds[t]=e(i),++t},i.prototype.draw=function(){var t=this._cardIds,e=t.length;if(0===e)return null;var n=Math.random(),i=n*e|0,o=t[i],a=t[e-1];return t[i]=a,t.length=e-1,o},e.exports=i,cc._RFpop()},{Types:"Types"}],FXPlayer:[function(t,e,n){"use strict";cc._RFpush(e,"68da2yjdGVMSYhXLN9DukIB","FXPlayer"),cc.Class({"extends":cc.Component,init:function(){this.anim=this.getComponent(cc.Animation),this.sprite=this.getComponent(cc.Sprite)},show:function(t){this.sprite.enabled=t},playFX:function(t){this.anim.play(t)},hideFX:function(){this.sprite.enabled=!1}}),cc._RFpop()},{}],Game:[function(t,e,n){"use strict";cc._RFpush(e,"63738OONCFKHqsf4QSeJSun","Game");var i=t("PlayerData").players,o=t("Decks"),a=t("Types"),s=a.ActorPlayingState,r=t("game-fsm"),c=cc.Class({"extends":cc.Component,properties:{playerAnchors:{"default":[],type:cc.Node},playerPrefab:{"default":null,type:cc.Prefab},dealer:{"default":null,type:cc.Node},inGameUI:{"default":null,type:cc.Node},betUI:{"default":null,type:cc.Node},assetMng:{"default":null,type:cc.Node},audioMng:{"default":null,type:cc.Node},turnDuration:0,betDuration:0,totalChipsNum:0,totalDiamondNum:0,numberOfDecks:{"default":1,type:"Integer"}},statics:{instance:null},onLoad:function(){c.instance=this,this.inGameUI=this.inGameUI.getComponent("InGameUI"),this.assetMng=this.assetMng.getComponent("AssetMng"),this.audioMng=this.audioMng.getComponent("AudioMng"),this.betUI=this.betUI.getComponent("Bet"),this.inGameUI.init(this.betDuration),this.betUI.init(),this.dealer=this.dealer.getComponent("Dealer"),this.dealer.init(),this.player=null,this.createPlayers(),this.info=this.inGameUI.resultTxt,this.totalChips=this.inGameUI.labelTotalChips,this.decks=new o(this.numberOfDecks),this.fsm=r,this.fsm.init(this),this.updateTotalChips(),this.audioMng.playMusic()},addStake:function(t){return this.totalChipsNum<t?(console.log("not enough chips!"),this.info.enabled=!0,this.info.string="金币不足!",!1):(this.totalChipsNum-=t,this.updateTotalChips(),this.player.addStake(t),this.audioMng.playChips(),this.info.enabled=!1,this.info.string="请下注",!0)},resetStake:function(){this.totalChipsNum+=this.player.stakeNum,this.player.resetStake(),this.updateTotalChips()},updateTotalChips:function(){this.totalChips.string=this.totalChipsNum,this.player.renderer.updateTotalStake(this.totalChipsNum)},createPlayers:function(){for(var t=0;5>t;++t){var e=cc.instantiate(this.playerPrefab),n=this.playerAnchors[t],o=t>2;n.addChild(e),e.position=cc.p(0,0);var a=cc.find("anchorPlayerInfo",n).getPosition(),s=cc.find("anchorStake",n).getPosition(),r=e.getComponent("ActorRenderer");r.init(i[t],a,s,this.turnDuration,o),2===t&&(this.player=e.getComponent("Player"),this.player.init())}},hit:function(){this.player.addCard(this.decks.draw()),this.player.state===s.Bust&&this.fsm.onPlayerActed(),this.audioMng.playCard(),this.audioMng.playButton()},stand:function(){this.player.stand(),this.audioMng.playButton(),this.fsm.onPlayerActed()},deal:function(){this.fsm.toDeal(),this.audioMng.playButton()},start:function(){this.fsm.toBet(),this.audioMng.playButton()},report:function(){this.player.report(),this.fsm.onPlayerActed()},quitToMenu:function(){cc.director.loadScene("menu")},onEnterDealState:function(){this.betUI.resetTossedChips(),this.inGameUI.resetCountdown(),this.player.renderer.showStakeChips(this.player.stakeNum),this.player.addCard(this.decks.draw());var t=this.decks.draw();this.dealer.addHoleCard(t),this.player.addCard(this.decks.draw()),this.dealer.addCard(this.decks.draw()),this.audioMng.playCard(),this.fsm.onDealed()},onPlayersTurnState:function(t){t&&this.inGameUI.showGameState()},onEnterDealersTurnState:function(){for(;this.dealer.state===s.Normal;)this.dealer.wantHit()?this.dealer.addCard(this.decks.draw()):this.dealer.stand();this.fsm.onDealerActed()},onEndState:function(t){if(t){this.dealer.revealHoldCard(),this.inGameUI.showResultState();var e=this._getPlayerResult(this.player,this.dealer);switch(e){case a.Outcome.Win:this.info.string="You Win",this.audioMng.pauseMusic(),this.audioMng.playWin(),this.totalChipsNum+=this.player.stakeNum;var n=this.player.stakeNum;!this.player.state===a.ActorPlayingState.Report&&(n*=this.player.hand===a.Hand.BlackJack?1.5:2),this.totalChipsNum+=n,this.updateTotalChips();break;case a.Outcome.Lose:this.info.string="You Lose",this.audioMng.pauseMusic(),this.audioMng.playLose();break;case a.Outcome.Tie:this.info.string="Draw",this.totalChipsNum+=this.player.stakeNum,this.updateTotalChips()}}this.info.enabled=t},onBetState:function(t){t&&(this.decks.reset(),this.player.reset(),this.dealer.reset(),this.info.string="请下注",this.inGameUI.showBetState(),this.inGameUI.startCountdown(),this.audioMng.resumeMusic()),this.info.enabled=t},_getPlayerResult:function(t,e){var n=a.Outcome;return t.state===s.Bust?n.Lose:e.state===s.Bust?n.Win:t.state===s.Report?n.Win:t.hand>e.hand?n.Win:t.hand<e.hand?n.Lose:t.bestPoint===e.bestPoint?n.Tie:t.bestPoint<e.bestPoint?n.Lose:n.Win}});cc._RFpop()},{Decks:"Decks",PlayerData:"PlayerData",Types:"Types","game-fsm":"game-fsm"}],InGameUI:[function(t,e,n){"use strict";cc._RFpush(e,"f192efroeFEyaxtfh8TVXYz","InGameUI");var i=t("Game");cc.Class({"extends":cc.Component,properties:{panelChat:{"default":null,type:cc.Node},panelSocial:{"default":null,type:cc.Node},betStateUI:{"default":null,type:cc.Node},gameStateUI:{"default":null,type:cc.Node},resultTxt:{"default":null,type:cc.Label},betCounter:{"default":null,type:cc.Node},btnStart:{"default":null,type:cc.Node},labelTotalChips:{"default":null,type:cc.Label}},init:function(t){this.panelChat.active=!1,this.panelSocial.active=!1,this.resultTxt.enabled=!1,this.betStateUI.active=!0,this.gameStateUI.active=!1,this.btnStart.active=!1,this.betDuration=t,this.progressTimer=this.initCountdown()},initCountdown:function(){var t=i.instance.assetMng.texBetCountdown.getTexture();this.sgCountdown=new _ccsg.Sprite(t),this.sgCountdown.setColor(cc.Color.BLACK);var e=new cc.ProgressTimer(this.sgCountdown);return e.setName("progressTimer"),e.setMidpoint(cc.p(.5,.5)),e.setType(cc.ProgressTimer.Type.RADIAL),e.reverseDir=!0,this.betCounter._sgNode.addChild(e),e.setPosition(cc.p(0,-this.betCounter.height/2)),e.setPercentage(0),e},startCountdown:function(){if(this.progressTimer){var t=cc.progressFromTo(this.betDuration,0,100);this.progressTimer.runAction(t)}},resetCountdown:function(){this.progressTimer&&(this.progressTimer.stopAllActions(),this.progressTimer.setPercentage(100))},showBetState:function(){this.betStateUI.active=!0,this.gameStateUI.active=!1,this.btnStart.active=!1},showGameState:function(){this.betStateUI.active=!1,this.gameStateUI.active=!0,this.btnStart.active=!1},showResultState:function(){this.betStateUI.active=!1,this.gameStateUI.active=!1,this.btnStart.active=!0},toggleChat:function(){this.panelChat.active=!this.panelChat.active},toggleSocial:function(){this.panelSocial.active=!this.panelSocial.active},update:function(t){}}),cc._RFpop()},{Game:"Game"}],Menu:[function(t,e,n){"use strict";cc._RFpush(e,"20f60m+3RlGO7x2/ARzZ6Qc","Menu"),cc.Class({"extends":cc.Component,properties:{audioMng:{"default":null,type:cc.Node}},onLoad:function(){this.audioMng=this.audioMng.getComponent("AudioMng"),this.audioMng.playMusic()},playGame:function(){cc.director.loadScene("table")},update:function(t){}}),cc._RFpop()},{}],PlayerData:[function(t,e,n){"use strict";cc._RFpush(e,"4f9c5eXxqhHAKLxZeRmgHDB","PlayerData");var i=[{name:"燃烧吧，蛋蛋儿军",gold:3e3,photoIdx:0},{name:"地方政府",gold:2e3,photoIdx:1},{name:"手机超人",gold:1500,photoIdx:2},{name:"天灵灵，地灵灵",gold:500,photoIdx:3},{name:"哟哟，切克闹",gold:9e3,photoIdx:4},{name:"学姐不要死",gold:5e3,photoIdx:5},{name:"提百万",gold:1e4,photoIdx:6}];e.exports={players:i},cc._RFpop()},{}],Player:[function(t,e,n){"use strict";cc._RFpush(e,"226a2AvzRpHL7SJGTMy5PDX","Player");var i=t("Actor");cc.Class({"extends":i,init:function(){this._super(),this.labelStake=this.renderer.labelStakeOnTable,this.stakeNum=0},reset:function(){this._super(),this.resetStake()},addCard:function(t){this._super(t)},addStake:function(t){this.stakeNum+=t,this.updateStake(this.stakeNum)},resetStake:function(t){this.stakeNum=0,this.updateStake(this.stakeNum)},updateStake:function(t){this.labelStake.string=t}}),cc._RFpop()},{Actor:"Actor"}],RankItem:[function(t,e,n){"use strict";cc._RFpush(e,"1657ewfijBOXLq5zGqr6PvE","RankItem"),cc.Class({"extends":cc.Component,properties:{spRankBG:{"default":null,type:cc.Sprite},labelRank:{"default":null,type:cc.Label},labelPlayerName:{"default":null,type:cc.Label},labelGold:{"default":null,type:cc.Label},spPlayerPhoto:{"default":null,type:cc.Sprite},texRankBG:{"default":[],type:cc.SpriteFrame},texPlayerPhoto:{"default":[],type:cc.SpriteFrame}},init:function(t,e){3>t?(this.labelRank.node.active=!1,this.spRankBG.spriteFrame=this.texRankBG[t]):(this.labelRank.node.active=!0,this.labelRank.string=(t+1).toString()),this.labelPlayerName.string=e.name,this.labelGold.string=e.gold.toString(),this.spPlayerPhoto.spriteFrame=this.texPlayerPhoto[e.photoIdx]},update:function(t){}}),cc._RFpop()},{}],RankList:[function(t,e,n){"use strict";cc._RFpush(e,"fe3fcIxCFFLrKHg6s5+xRUU","RankList");var i=t("PlayerData").players;cc.Class({"extends":cc.Component,properties:{scrollView:{"default":null,type:cc.ScrollView},prefabRankItem:{"default":null,type:cc.Prefab},rankCount:0},onLoad:function(){this.content=this.scrollView.content,this.populateList()},populateList:function(){for(var t=0;t<this.rankCount;++t){var e=i[t],n=cc.instantiate(this.prefabRankItem);n.getComponent("RankItem").init(t,e),this.content.addChild(n)}},update:function(t){}}),cc._RFpop()},{PlayerData:"PlayerData"}],SideSwitcher:[function(t,e,n){"use strict";cc._RFpush(e,"3aae7lZKyhPqqsLD3wMKl6X","SideSwitcher"),cc.Class({"extends":cc.Component,properties:{retainSideNodes:{"default":[],type:cc.Node}},switchSide:function(){this.node.scaleX=-this.node.scaleX;for(var t=0;t<this.retainSideNodes.length;++t){var e=this.retainSideNodes[t];e.scaleX=-e.scaleX}}}),cc._RFpop()},{}],TossChip:[function(t,e,n){"use strict";cc._RFpush(e,"b4eb5Lo6U1IZ4eJWuxShCdH","TossChip"),cc.Class({"extends":cc.Component,properties:{anim:{"default":null,type:cc.Animation}},play:function(){this.anim.play("chip_toss")}}),cc._RFpop()},{}],Types:[function(t,e,n){"use strict";function i(t,e){Object.defineProperties(this,{point:{value:t,writable:!1},suit:{value:e,writable:!1},id:{value:13*(e-1)+(t-1),writable:!1},pointName:{get:function(){return a[this.point]}},suitName:{get:function(){return o[this.suit]}},isBlackSuit:{get:function(){return this.suit===o.Spade||this.suit===o.Club}},isRedSuit:{get:function(){return this.suit===o.Heart||this.suit===o.Diamond}}})}cc._RFpush(e,"5b633QMQxpFmYetofEvK2UD","Types");var o=cc.Enum({Spade:1,Heart:2,Club:3,Diamond:4}),a="NAN,A,2,3,4,5,6,7,8,9,10,J,Q,K".split(",");i.prototype.toString=function(){return this.suitName+" "+this.pointName};var s=new Array(52);i.fromId=function(t){return s[t]},function(){for(var t=1;4>=t;t++)for(var e=1;13>=e;e++){var n=new i(e,t);s[n.id]=n}}();var r=cc.Enum({Normal:-1,Stand:-1,Report:-1,Bust:-1}),c=cc.Enum({Win:-1,Lose:-1,Tie:-1}),u=cc.Enum({Normal:-1,BlackJack:-1,FiveCard:-1});e.exports={Suit:o,Card:i,ActorPlayingState:r,Hand:u,Outcome:c},cc._RFpop()},{}],Utils:[function(t,e,n){"use strict";function i(t){for(var e=!1,n=0,i=0;i<t.length;i++){var o=t[i];1===o.point&&(e=!0),n+=Math.min(10,o.point)}var a=n;return e&&21>=n+10&&(a+=10),{min:n,max:a}}function o(t){for(var e=0,n=0;n<t.length;n++){var i=t[n];e+=Math.min(10,i.point)}return e>21}cc._RFpush(e,"73590esk6xP9ICqhfUZalMg","Utils");var a=function(){return cc.sys.isMobile};e.exports={isBust:o,getMinMaxPoint:i,isMobile:a},cc._RFpop()},{}],"game-fsm":[function(t,e,n){"use strict";function i(t){return function(e){return e===t}}cc._RFpush(e,"6510d1SmQRMMYH8FEIA7zXq","game-fsm");var o,a,s,r=t("state.com"),c=!1;n={init:function(t){r.console=console,a=new r.StateMachine("root");var e=new r.PseudoState("init-root",a,r.PseudoStateKind.Initial),n=new r.State("下注",a);s=new r.State("已开局",a);var c=new r.State("结算",a);e.to(n),n.to(s).when(i("deal")),s.to(c).when(i("end")),c.to(n).when(i("bet")),n.entry(function(){t.onBetState(!0)}),n.exit(function(){t.onBetState(!1)}),c.entry(function(){t.onEndState(!0)}),c.exit(function(){t.onEndState(!1)});var u=new r.PseudoState("init 已开局",s,r.PseudoStateKind.Initial),l=new r.State("发牌",s),h=new r.State("玩家决策",s),p=new r.State("庄家决策",s);u.to(l),l.to(h).when(i("dealed")),h.to(p).when(i("player acted")),l.entry(function(){t.onEnterDealState()}),h.entry(function(){t.onPlayersTurnState(!0)}),h.exit(function(){t.onPlayersTurnState(!1)}),p.entry(function(){t.onEnterDealersTurnState()}),o=new r.StateMachineInstance("fsm"),r.initialise(a,o)},toDeal:function(){this._evaluate("deal")},toBet:function(){this._evaluate("bet")},onDealed:function(){this._evaluate("dealed")},onPlayerActed:function(){this._evaluate("player acted")},onDealerActed:function(){this._evaluate("end")},_evaluate:function(t){return c?void setTimeout(function(){r.evaluate(a,o,t)},1):(c=!0,r.evaluate(a,o,t),void(c=!1))},_getInstance:function(){return o},_getModel:function(){return a}},e.exports=n,cc._RFpop()},{"state.com":"state.com"}],"state.com":[function(t,e,n){"use strict";cc._RFpush(e,"71d9293mx9CFryhJvRw85ZS","state.com");var i;!function(t){var e=function(){function t(t){this.actions=[],t&&this.push(t)}return t.prototype.push=function(e){return Array.prototype.push.apply(this.actions,e instanceof t?e.actions:arguments),this},t.prototype.hasActions=function(){return 0!==this.actions.length},t.prototype.invoke=function(t,e,n){void 0===n&&(n=!1),this.actions.forEach(function(i){return i(t,e,n)})},t}();t.Behavior=e}(i||(i={}));var i;!function(t){!function(t){t[t.Initial=0]="Initial",t[t.ShallowHistory=1]="ShallowHistory",t[t.DeepHistory=2]="DeepHistory",t[t.Choice=3]="Choice",t[t.Junction=4]="Junction",t[t.Terminate=5]="Terminate"}(t.PseudoStateKind||(t.PseudoStateKind={}));t.PseudoStateKind}(i||(i={}));var i;!function(t){!function(t){t[t.Internal=0]="Internal",t[t.Local=1]="Local",t[t.External=2]="External"}(t.TransitionKind||(t.TransitionKind={}));t.TransitionKind}(i||(i={}));var i;!function(t){var e=function(){function t(e,n){this.name=e,this.qualifiedName=n?n.qualifiedName+t.namespaceSeparator+e:e}return t.prototype.toString=function(){return this.qualifiedName},t.namespaceSeparator=".",t}();t.Element=e}(i||(i={}));var i,o=function(t,e){function n(){this.constructor=t}for(var i in e)e.hasOwnProperty(i)&&(t[i]=e[i]);n.prototype=e.prototype,t.prototype=new n};!function(t){var e=function(t){function e(e,n){t.call(this,e,n),this.vertices=[],this.state=n,this.state.regions.push(this),this.state.getRoot().clean=!1}return o(e,t),e.prototype.getRoot=function(){return this.state.getRoot()},e.prototype.accept=function(t,e,n,i){return t.visitRegion(this,e,n,i)},e.defaultName="default",e}(t.Element);t.Region=e}(i||(i={}));var i;!function(t){var e=function(e){function n(n,i){e.call(this,n,i=i instanceof t.State?i.defaultRegion():i),this.outgoing=[],this.region=i,this.region&&(this.region.vertices.push(this),this.region.getRoot().clean=!1)}return o(n,e),n.prototype.getRoot=function(){return this.region.getRoot()},n.prototype.to=function(e,n){return void 0===n&&(n=t.TransitionKind.External),new t.Transition(this,e,n)},n.prototype.accept=function(t,e,n,i){},n}(t.Element);t.Vertex=e}(i||(i={}));var i;!function(t){var e=function(e){function n(n,i,o){void 0===o&&(o=t.PseudoStateKind.Initial),e.call(this,n,i),this.kind=o}return o(n,e),n.prototype.isHistory=function(){return this.kind===t.PseudoStateKind.DeepHistory||this.kind===t.PseudoStateKind.ShallowHistory},n.prototype.isInitial=function(){return this.kind===t.PseudoStateKind.Initial||this.isHistory()},n.prototype.accept=function(t,e,n,i){return t.visitPseudoState(this,e,n,i)},n}(t.Vertex);t.PseudoState=e}(i||(i={}));var i;!function(t){var e=function(e){function n(n,i){e.call(this,n,i),this.exitBehavior=new t.Behavior,this.entryBehavior=new t.Behavior,this.regions=[]}return o(n,e),n.prototype.defaultRegion=function(){return this.regions.reduce(function(e,n){return n.name===t.Region.defaultName?n:e},void 0)||new t.Region(t.Region.defaultName,this)},n.prototype.isFinal=function(){return 0===this.outgoing.length},n.prototype.isSimple=function(){return 0===this.regions.length},n.prototype.isComposite=function(){return this.regions.length>0},n.prototype.isOrthogonal=function(){return this.regions.length>1},n.prototype.exit=function(t){return this.exitBehavior.push(t),this.getRoot().clean=!1,this},n.prototype.entry=function(t){return this.entryBehavior.push(t),this.getRoot().clean=!1,this},n.prototype.accept=function(t,e,n,i){return t.visitState(this,e,n,i)},n}(t.Vertex);t.State=e}(i||(i={}));var i;!function(t){var e=function(t){function e(e,n){t.call(this,e,n)}return o(e,t),e.prototype.accept=function(t,e,n,i){return t.visitFinalState(this,e,n,i)},e}(t.State);t.FinalState=e}(i||(i={}));var i;!function(t){var e=function(t){function e(e){t.call(this,e,void 0),this.clean=!1}return o(e,t),e.prototype.getRoot=function(){return this.region?this.region.getRoot():this},e.prototype.accept=function(t,e,n,i){return t.visitStateMachine(this,e,n,i)},e}(t.State);t.StateMachine=e}(i||(i={}));var i;!function(t){var e=function(){function e(n,i,o){var a=this;void 0===o&&(o=t.TransitionKind.External),this.transitionBehavior=new t.Behavior,this.onTraverse=new t.Behavior,this.source=n,this.target=i,this.kind=i?o:t.TransitionKind.Internal,this.guard=n instanceof t.PseudoState?e.TrueGuard:function(t){return t===a.source},this.source.outgoing.push(this),this.source.getRoot().clean=!1}return e.prototype["else"]=function(){return this.guard=e.FalseGuard,this},e.prototype.when=function(t){return this.guard=t,this},e.prototype.effect=function(t){return this.transitionBehavior.push(t),this.source.getRoot().clean=!1,this},e.prototype.accept=function(t,e,n,i){return t.visitTransition(this,e,n,i)},e.prototype.toString=function(){return"["+(this.target?this.source+" -> "+this.target:this.source)+"]"},e.TrueGuard=function(){return!0},e.FalseGuard=function(){return!1},e}();t.Transition=e}(i||(i={}));var i;!function(t){var e=function(){function t(){}return t.prototype.visitElement=function(t,e,n,i){},t.prototype.visitRegion=function(t,e,n,i){var o=this,a=this.visitElement(t,e,n,i);return t.vertices.forEach(function(t){t.accept(o,e,n,i)}),a},t.prototype.visitVertex=function(t,e,n,i){var o=this,a=this.visitElement(t,e,n,i);return t.outgoing.forEach(function(t){t.accept(o,e,n,i)}),a},t.prototype.visitPseudoState=function(t,e,n,i){return this.visitVertex(t,e,n,i)},t.prototype.visitState=function(t,e,n,i){var o=this,a=this.visitVertex(t,e,n,i);return t.regions.forEach(function(t){t.accept(o,e,n,i)}),a},t.prototype.visitFinalState=function(t,e,n,i){return this.visitState(t,e,n,i)},t.prototype.visitStateMachine=function(t,e,n,i){return this.visitState(t,e,n,i)},t.prototype.visitTransition=function(t,e,n,i){},t}();t.Visitor=e}(i||(i={}));var i;!function(t){var e=function(){function t(t){void 0===t&&(t="unnamed"),this.last={},this.isTerminated=!1,this.name=t}return t.prototype.setCurrent=function(t,e){this.last[t.qualifiedName]=e},t.prototype.getCurrent=function(t){return this.last[t.qualifiedName]},t.prototype.toString=function(){return this.name},t}();t.StateMachineInstance=e}(i||(i={}));var i;!function(t){function e(t){i=t}function n(){return i}t.setRandom=e,t.getRandom=n;var i=function(t){return Math.floor(Math.random()*t)}}(i||(i={}));var i;!function(t){function e(n,i){for(var o=!0;o;){var a=n,s=i;if(o=!1,a instanceof t.Region)n=a.state,i=s,o=!0;else if(a instanceof t.State)return a.region?e(a.region,s)&&s.getCurrent(a.region)===a:!0}}t.isActive=e}(i||(i={}));var i;!function(t){function e(n,i){return n instanceof t.Region?i.getCurrent(n).isFinal():n instanceof t.State?n.regions.every(function(t){return e(t,i)}):!0}t.isComplete=e}(i||(i={}));var i;!function(t){function e(n,i,o){void 0===o&&(o=!0),i?(o&&n.clean===!1&&e(n),t.console.log("initialise "+i),n.onInitialise.invoke(void 0,i)):(t.console.log("initialise "+n.name),n.accept(new f,!1),n.clean=!0)}function n(n,o,a,s){return void 0===s&&(s=!0),t.console.log(o+" evaluate "+a),s&&n.clean===!1&&e(n),o.isTerminated?!1:i(n,o,a)}function i(e,n,o){var s=!1;if(e.regions.every(function(a){return i(n.getCurrent(a),n,o)?(s=!0,t.isActive(e,n)):!0}),s)o!==e&&t.isComplete(e,n)&&i(e,n,e);else{var r=e.outgoing.filter(function(t){return t.guard(o,n)});1===r.length?s=a(r[0],n,o):r.length>1&&t.console.error(e+": multiple outbound transitions evaluated true for message "+o);
}return s}function a(e,n,o){for(var r=new t.Behavior(e.onTraverse),c=e.target;c&&c instanceof t.PseudoState&&c.kind===t.PseudoStateKind.Junction;)c=(e=s(c,n,o)).target,r.push(e.onTraverse);return r.invoke(o,n),c&&c instanceof t.PseudoState&&c.kind===t.PseudoStateKind.Choice?a(s(c,n,o),n,o):c&&c instanceof t.State&&t.isComplete(c,n)&&i(c,n,c),!0}function s(e,n,i){var o=e.outgoing.filter(function(t){return t.guard(i,n)});return e.kind===t.PseudoStateKind.Choice?0!==o.length?o[t.getRandom()(o.length)]:r(e):o.length>1?void t.console.error("Multiple outbound transition guards returned true at "+this+" for "+i):o[0]||r(e)}function r(e){return e.outgoing.filter(function(e){return e.guard===t.Transition.FalseGuard})[0]}function c(e){return e[0]||(e[0]=new t.Behavior)}function u(e){return e[1]||(e[1]=new t.Behavior)}function l(e){return e[2]||(e[2]=new t.Behavior)}function h(e){return new t.Behavior(u(e)).push(l(e))}function p(t){return(t.region?p(t.region.state):[]).concat(t)}t.initialise=e,t.evaluate=n;var d=function(e){function n(){e.apply(this,arguments)}return o(n,e),n.prototype.visitTransition=function(e,n){e.kind===t.TransitionKind.Internal?e.onTraverse.push(e.transitionBehavior):e.kind===t.TransitionKind.Local?this.visitLocalTransition(e,n):this.visitExternalTransition(e,n)},n.prototype.visitLocalTransition=function(e,n){var i=this;e.onTraverse.push(function(o,a){for(var s=p(e.target),r=0;t.isActive(s[r],a);)++r;for(c(n(a.getCurrent(s[r].region))).invoke(o,a),e.transitionBehavior.invoke(o,a);r<s.length;)i.cascadeElementEntry(e,n,s[r++],s[r],function(t){t.invoke(o,a)});l(n(e.target)).invoke(o,a)})},n.prototype.visitExternalTransition=function(t,e){for(var n=p(t.source),i=p(t.target),o=Math.min(n.length,i.length)-1;n[o-1]!==i[o-1];)--o;for(t.onTraverse.push(c(e(n[o]))),t.onTraverse.push(t.transitionBehavior);o<i.length;)this.cascadeElementEntry(t,e,i[o++],i[o],function(e){return t.onTraverse.push(e)});t.onTraverse.push(l(e(t.target)))},n.prototype.cascadeElementEntry=function(e,n,i,o,a){a(u(n(i))),o&&i instanceof t.State&&i.regions.forEach(function(t){a(u(n(t))),t!==o.region&&a(l(n(t)))})},n}(t.Visitor),f=function(e){function n(){e.apply(this,arguments),this.behaviours={}}return o(n,e),n.prototype.behaviour=function(t){return this.behaviours[t.qualifiedName]||(this.behaviours[t.qualifiedName]=[])},n.prototype.visitElement=function(e,n){t.console!==g&&(c(this.behaviour(e)).push(function(n,i){return t.console.log(i+" leave "+e)}),u(this.behaviour(e)).push(function(n,i){return t.console.log(i+" enter "+e)}))},n.prototype.visitRegion=function(e,n){var i=this,o=e.vertices.reduce(function(e,n){return n instanceof t.PseudoState&&n.isInitial()?n:e},void 0);e.vertices.forEach(function(e){e.accept(i,n||o&&o.kind===t.PseudoStateKind.DeepHistory)}),c(this.behaviour(e)).push(function(t,n){return c(i.behaviour(n.getCurrent(e))).invoke(t,n)}),n||!o||o.isHistory()?l(this.behaviour(e)).push(function(n,a,s){h(i.behaviour(s||o.isHistory()?a.getCurrent(e)||o:o)).invoke(n,a,s||o.kind===t.PseudoStateKind.DeepHistory)}):l(this.behaviour(e)).push(h(this.behaviour(o))),this.visitElement(e,n)},n.prototype.visitPseudoState=function(n,i){e.prototype.visitPseudoState.call(this,n,i),n.isInitial()?l(this.behaviour(n)).push(function(t,e){return a(n.outgoing[0],e)}):n.kind===t.PseudoStateKind.Terminate&&u(this.behaviour(n)).push(function(t,e){return e.isTerminated=!0})},n.prototype.visitState=function(t,e){var n=this;t.regions.forEach(function(i){i.accept(n,e),c(n.behaviour(t)).push(c(n.behaviour(i))),l(n.behaviour(t)).push(h(n.behaviour(i)))}),this.visitVertex(t,e),c(this.behaviour(t)).push(t.exitBehavior),u(this.behaviour(t)).push(t.entryBehavior),u(this.behaviour(t)).push(function(e,n){t.region&&n.setCurrent(t.region,t)})},n.prototype.visitStateMachine=function(t,n){var i=this;e.prototype.visitStateMachine.call(this,t,n),t.accept(new d,function(t){return i.behaviour(t)}),t.onInitialise=h(this.behaviour(t))},n}(t.Visitor),g={log:function(t){for(var e=[],n=1;n<arguments.length;n++)e[n-1]=arguments[n]},warn:function(t){for(var e=[],n=1;n<arguments.length;n++)e[n-1]=arguments[n]},error:function(t){for(var e=[],n=1;n<arguments.length;n++)e[n-1]=arguments[n];throw t}};t.console=g}(i||(i={}));var i;!function(t){function e(t){t.accept(new i)}function n(t){return(t.region?n(t.region.state):[]).concat(t)}t.validate=e;var i=function(e){function i(){e.apply(this,arguments)}return o(i,e),i.prototype.visitPseudoState=function(n){e.prototype.visitPseudoState.call(this,n),n.kind===t.PseudoStateKind.Choice||n.kind===t.PseudoStateKind.Junction?(0===n.outgoing.length&&t.console.error(n+": "+n.kind+" pseudo states must have at least one outgoing transition."),n.outgoing.filter(function(e){return e.guard===t.Transition.FalseGuard}).length>1&&t.console.error(n+": "+n.kind+" pseudo states cannot have more than one Else transitions.")):(0!==n.outgoing.filter(function(e){return e.guard===t.Transition.FalseGuard}).length&&t.console.error(n+": "+n.kind+" pseudo states cannot have Else transitions."),n.isInitial()&&(1!==n.outgoing.length?t.console.error(n+": initial pseudo states must have one outgoing transition."):n.outgoing[0].guard!==t.Transition.TrueGuard&&t.console.error(n+": initial pseudo states cannot have a guard condition.")))},i.prototype.visitRegion=function(n){e.prototype.visitRegion.call(this,n);var i;n.vertices.forEach(function(e){e instanceof t.PseudoState&&e.isInitial()&&(i&&t.console.error(n+": regions may have at most one initial pseudo state."),i=e)})},i.prototype.visitState=function(n){e.prototype.visitState.call(this,n),n.regions.filter(function(e){return e.name===t.Region.defaultName}).length>1&&t.console.error(n+": a state cannot have more than one region named "+t.Region.defaultName)},i.prototype.visitFinalState=function(n){e.prototype.visitFinalState.call(this,n),0!==n.outgoing.length&&t.console.error(n+": final states must not have outgoing transitions."),0!==n.regions.length&&t.console.error(n+": final states must not have child regions."),n.entryBehavior.hasActions()&&t.console.warn(n+": final states may not have entry behavior."),n.exitBehavior.hasActions()&&t.console.warn(n+": final states may not have exit behavior.")},i.prototype.visitTransition=function(i){e.prototype.visitTransition.call(this,i),i.kind===t.TransitionKind.Local&&-1===n(i.target).indexOf(i.source)&&t.console.error(i+": local transition target vertices must be a child of the source composite sate.")},i}(t.Visitor)}(i||(i={})),e.exports=i,cc._RFpop()},{}]},{},["AudioMng","RankItem","Decks","ActorRenderer","Menu","Player","Bet","SideSwitcher","PlayerData","AssetMng","Types","game-fsm","Game","FXPlayer","state.com","Utils","Actor","ButtonScaler","CounterTest","Card","TossChip","Dealer","InGameUI","RankList"]);