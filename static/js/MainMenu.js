var Vakond = Vakond || {};

//title screen
Vakond.MainMenu = function(){};

Vakond.MainMenu.prototype = {
  init: function() {},
  create: function() {
    var game = Vakond.game;
    this.game.add.sprite(0,0, "background");
    this.createButton(game,"Play", game.world.centerX, game.world.centerY - 50, 200, 50,
                      function() {
                        this.state.start('Game');
                      });
    
    this.createButton(game,"Options", game.world.centerX, game.world.centerY + 20, 200, 50,
                      function() {
                        console.log("You don't have any options fucker!");
                      });
    titlescreen = game.add.sprite(game.world.centerX, game.world.centerY - 192, "titlescreen");
    titlescreen.anchor.setTo(0.5,0.5);
    this.game.add.sprite(470, 230, "mole");
    //show the space tile, repeated
    //start game text
    //highest score
  },
  createButton: function(game, string, x, y, w, h, callback) {
    var button1 = game.add.button(x,y,'button', callback, this,2,1,0);
    button1.anchor.setTo(0.5, 0.5);
    button1.width = w;
    button1.height = h;
    var txt = game.add.text(button1.x, button1.y,string, {font:"36px Arial", fill: "#000000",
                                                          align: "center"});

    txt.anchor.setTo(0.5,0.5);
  },
  update: function() {
  }
};