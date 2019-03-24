// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

import UtilsModel from '../Model/utisModel'

cc.Class({
    extends: cc.Component,

    properties: {
      removeUtil: {
        type: cc.Node,
        default: null
      },
      exchangeUtil: {
        type: cc.Node,
        default: null
      },
      refreshUtil: {
        type: cc.Node,
        default: null
      },
      rowUtil: {
        type: cc.Node,
        default: null
      },
      columnUtil: {
        type: cc.Node,
        default: null
      },
      gameScene: {
        type: cc.Node,
        default: null
      },
      answerCardPrefab: {
        default: null,
        type: cc.Prefab
      }
    },
    onLoad () {
      let _this = this;
      this.init();
      console.log(this.GameController)
      this.utilsModel = new UtilsModel();
      
      this.utilsModel.utilsList.forEach(key => {
        this[key].on(cc.Node.EventType.TOUCH_START, function(eventTouch) {
          _this.GameController.utilType = _this.utilsModel.utils[key].type;
          _this.GameController.addAnswerCard();
        })
      })
    },
    init () {
      this.GameController = this.gameScene.getComponent('GameController');
    }
});
