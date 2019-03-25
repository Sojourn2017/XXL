// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
  extends: cc.Component,

  properties: {
    // foo: {
    //     // ATTRIBUTES:
    //     default: null,        // The default value will be used only when the component attaching
    //                           // to a node for the first time
    //     type: cc.SpriteFrame, // optional, default is typeof default
    //     serializable: true,   // optional, default is true
    // },
    // bar: {
    //     get () {
    //         return this._bar;
    //     },
    //     set (value) {
    //         this._bar = value;
    //     }
    // },
    zIndex: 10,
    closeFlag: {
      type: cc.Node,
      default: null
    }
  },

  // LIFE-CYCLE CALLBACKS:

  onLoad() {
    this.init();
  },

  init() {
    let _this = this;
    this.node.zIndex = this.zIndex;
    this.closeFlag.on(cc.Node.EventType.TOUCH_START, function(eventTouch) {
      let gameContriller = cc.director.getScene().getChildByName("Canvas").getChildByName("GameScene").getComponent("GameController");
      gameContriller.removeAnswerCard();
      if (gameContriller.utilType == 3) {
        gameContriller.refreshUtil();
        gameContriller.utilType = 0;
      }
    });
  }

  // update (dt) {},
});
