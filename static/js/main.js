var Vakond = Vakond || {};

Vakond.game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, '');

Vakond.game.state.add('Boot', Vakond.Boot);
Vakond.game.state.add('Preload', Vakond.Preload);
Vakond.game.state.add('MainMenu', Vakond.MainMenu);
Vakond.game.state.add('Game', Vakond.Game);

Vakond.game.state.start('Boot');