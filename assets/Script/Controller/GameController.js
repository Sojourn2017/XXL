import GameModel from "../Model/GameModel";
import {CELL_WIDTH} from '../Model/ConstValue';

cc.Class({
  extends: cc.Component,

  properties: {
    // foo: {
    //    default: null,      // The default value will be used only when the component attaching
    //                           to a node for the first time
    //    url: cc.Texture2D,  // optional, default is typeof default
    //    serializable: true, // optional, default is true
    //    visible: true,      // optional, default is true
    //    displayName: 'Foo', // optional
    //    readonly: false,    // optional, default is false
    // },
    // ...
    grid: {
      default: null,
      type: cc.Node
    },
    CounterText: {
      type: cc.Label,
      default: null
    },
    answerCardPrefab: {
      default: null,
      type: cc.Prefab
    },
    canvas: {
      type: cc.Node,
      default: null
    },
    utilType: 0,  // 使用的道具类型
    gameOver: false
  },

  // use this for initialization
  onLoad: function() {
    this.gameModel = new GameModel();
    this.gameModel.init(5);
    var gridScript = this.grid.getComponent("GridView");
    gridScript.setController(this);
    gridScript.initWithCellModels(this.gameModel.getCells());
    this.gridScript = gridScript;
    window.gc = this;

    console.log(cc.winSize);
    this.test();
  },

  test() {
    console.log(this.CounterText)
    this.CounterText.node.on(
      cc.Node.EventType.TOUCH_START,
      function(eventTouch) {
        let EffecLayer = cc.director
        .getScene()
        .getChildByName("Canvas")
        .getChildByName("GameScene").getChildByName("EffecLayer");
        let cmd = {"playTime":0.3,"pos":{"x":8,"y":2},"action":"colBomb"}
        let callFunc = cc.callFunc(function () {
          let bombWhite = EffecLayer.getComponent("EffectLayer").bombWhite;
          let instantEffect = cc.instantiate(bombWhite);
          let animation  = instantEffect.getComponent(cc.Animation);
          animation.play("effect_col");
          instantEffect.x = CELL_WIDTH * (cmd.pos.x - 0.5);
          instantEffect.y = CELL_WIDTH * (cmd.pos.y - 0.5);
          instantEffect.parent = EffecLayer;
          animation.on("finished",function(){
              instantEffect.destroy();
          },this);
        })
        EffecLayer.runAction(cc.sequence(cc.delayTime(cmd.playTime), callFunc));
      },
    );
  },

  update: function (dt) {
    if (!this.gameOver && !this.gridScript.isInPlayAni && this.CounterText.string == 0) {
      this.addAnswerCard();
      this.gameOver = true;
    }
  },

  selectCell: function(pos) {
    if (this.gameOver) {
      this.addAnswerCard();
      return;
    }
    let selectCellRes = this.gameModel.selectCell(pos);
    if (selectCellRes.length > 1 && selectCellRes[1].length > 0) {
      this.handleCounter();
    }
    return selectCellRes;
  },
  crushCell (...rest) {
    this.gameModel.crushCell.apply(this.gameModel, rest);
  },
  cleanCmd: function() {
    this.gameModel.cleanCmd();
  },
  handleCounter() {
    let CounterText = this.CounterText;
    let curCount = Number(CounterText.string);
    curCount > 0 && this.setCounter(--curCount);
  },

  setCounter(count) {
    this.CounterText.string = count;
  },

  addAnswerCard () {
    this.AnswerCard = cc.instantiate(this.answerCardPrefab);
    this.canvas.addChild(this.AnswerCard);
    this.AnswerCard.zIndex = 100;
    this.node.pauseSystemEvents(true);
  },

  removeAnswerCard () {
    this.AnswerCard.destroy();
    this.node.resumeSystemEvents(true);
  },

  removeUtil (cellPos) {
    return this.gameModel.removeUtil(cellPos);
  },
  exchangeUtil (cellPos) {
    return this.gameModel.exchangeUtil(cellPos);
  },
  refreshUtil () {
    this.grid.children.splice(1);
    this.gameModel.init(5);
    this.gridScript.initWithCellModels(this.gameModel.getCells());
  },
  rowUtil (cellPos) {
    return this.gameModel.rowUtil(cellPos);
  },
  columnUtil (cellPos) {
    return this.gameModel.columnUtil(cellPos);
  },
});
