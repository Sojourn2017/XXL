import GameModel from "../Model/GameModel";

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
  }
});
