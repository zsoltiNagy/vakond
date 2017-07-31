var Vakond = Vakond || {};

//title screen
Vakond.MainMenu = function(){};

Vakond.MainMenu.prototype = {
  init: function() {},
  create: function() {
  	//show the space tile, repeated
    //start game text
    //highest score
  },
  update: function() {
    if(this.game.input.activePointer.justPressed()) {
      this.game.state.start('Game');
    }
  }
};