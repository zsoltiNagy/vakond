var Vakond = Vakond || {};

//loading the game assets
Vakond.Preload = function(){};

Vakond.Preload.prototype = {
  preload: function() {
  	//show loading screen
  	//load game assets
    this.load.image('ground', '/static/assets/images/vakond-ground.png', 32, 32);
    this.load.image('sky', '/static/assets/images/vakond-sky.png', 32, 32);
    this.load.image('player', '/static/assets/images/vakond-player.png', 32, 32);
    this.load.image('building', '/static/assets/images/vakond-building.png', 32, 32);
  },
  create: function() {
  	this.state.start('MainMenu');
  }
};