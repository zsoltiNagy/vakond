var Vakond = Vakond || {};

//loading the game assets
Vakond.Preload = function(){};

Vakond.Preload.prototype = {
  preload: function() {
  	//show loading screen
  	//load game assets
    this.load.image('ground', '/static/assets/images/vakond-rich-small-ground.png');
    this.load.image('sky', '/static/assets/images/vakond-sky.png');
    //this.load.image('player', '/static/assets/images/vakond-player.png');
    this.load.image('building', '/static/assets/images/vakond-building.png');
    this.load.image('gem', '/static/assets/images/vakond-rich-gem.png');
    this.load.spritesheet('player', '/static/assets/images/vakond-player-sprite.png', 32, 32)
  },
  create: function() {
  	this.state.start('MainMenu');
  }
};