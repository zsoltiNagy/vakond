var Vakond = Vakond || {};

//title screen
Vakond.MainMenu = function(){};

Vakond.MainMenu.prototype = {
  init: function() {},
  create: function() {
  	//show the space tile, repeated
    //start game text
    var text = "Click to begin";
    var style = { font: "30px Arial", fill: "#fff", align: "center" };
    var t = this.game.add.text(this.game.width/2, this.game.height/2, text, style);
    t.anchor.set(0.5);

    //highest score
  },
  update: function() {
    if(this.game.input.activePointer.justPressed()) {
      this.game.state.start('Game');
    }
  }
};