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
        gameScene: {
          type: cc.Node,
          default: null
        }
    },

    // use this for initialization
    testGameModel: function () {
        var gameModel = this.gameScene.getComponent("GameController").gameModel;
        console.log(this.gameScene);
        console.log(gameModel)
        // gameModel.init();
        gameModel.printInfo();
        // for(var i = 1;i<=9;i++){
        //     for(var j = 1;j<=9;j++){
        //         // console.log(gameModel.cells[j][i])
        //         console.log(gameModel.checkPoint(i,j).join(" ,"));
        //     }
        // }
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});