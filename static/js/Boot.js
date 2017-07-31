var Vakond = Vakond || {};

Vakond.Boot = function(){};

//setting game configuration and loading the assets for the loading screen
Vakond.Boot.prototype = {
  preload: function() {
  	//assets we will use in the loading screen
  },
  create: function() {
	//physics system for movement
	this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.state.start('Preload');
  }
};
