var Vakond = Vakond || {};

Vakond.Game = function(){};

Vakond.Game.prototype = { 
    create: function() {
        // World size
        this.world.resize(800, 1920);
        // Background
        this.sky = this.add.tileSprite(0, 0, this.world.width, this.world.height, 'sky');
        // Grounds
        this.grounds = this.add.physicsGroup();
        for (let y = 240; y < this.world.height; y += 16) {

            for (let x = 0; x < this.world.width; x += 16) {
                var ground = this.grounds.create(x, y, 'ground');
                ground.scale.setTo(2, 2);
            }
        }
        this.grounds.setAll('body.allowGravity', false);
        this.grounds.setAll('body.immovable', true);
        // Gems
        this.gems = this.add.physicsGroup();
        for (let counter = 0; counter < 30; counter++) {
            let x = this.rnd.between(0, this.world.width);
            let y = this.rnd.between(240, this.world.height);
            var gem = this.gems.create(x, y, 'gem');
            gem.scale.setTo(2, 2);
        }
        this.gems.setAll('body.allowGravity', false);
        this.gems.setAll('body.immovable', true);
        // Fuel Station
        this.fuelStation = this.add.sprite(64, 176, 'building');
        this.physics.arcade.enable(this.fuelStation);
        this.fuelStation.scale.setTo(2, 2);
        this.fuelStation.body.allowGravity = false;
        this.fuelStation.body.immovable = true;
        // Player
        this.player = this.add.sprite(0, 0, 'player');
        this.physics.arcade.enable(this.player);
        this.player.body.collideWorldBounds = true;
        this.player.body.bounce.y = 0.2;
        this.player.body.gravity.y = 300;
        this.player.scale.setTo(1.2, 1.2);
        this.player.anchor.setTo(0.5);
        // playerVelocity
        this.playerVelocityY = 0;
        playerVelocityYText = this.add.text(16, 48, 'playerVelocityY: ', { fontSize: '32px', fill: '#000' });
        playerVelocityYText.text = 'playerVelocityY: ' + this.playerVelocityY;
        playerVelocityYText.fixedToCamera = true;
        // Hull
        this.playerHull = 200;
        playerHullText = this.add.text(16, 80, 'playerHull: ', { fontSize: '32px', fill: '#000'});
        playerHullText.text = 'playerHull: ' + this.playerHull;
        playerHullText.fixedToCamera = true;
        // Fuel
        this.playerFuel = 15;
        playerFuelText = this.add.text(16, 112, 'playerFuel: ', { fontSize: '32px', fill: '#000'});
        playerFuelText.text = 'playerFuel: ' + this.playerFuel;
        playerFuelText.fixedToCamera = true;
        // Controls
        cursors = this.input.keyboard.createCursorKeys();
        // Score
        this.playerScore = 0;
        scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#000' });
        scoreText.text = 'Score: ' + this.playerScore;
        scoreText.fixedToCamera = true;
    },

    collisionHandler: function(player, ground){
        var playerUnderground = this.player.body.touching.down && player.y > 272 && !cursors.down.isDown
        if (cursors.up.isDown) {
            this.player.body.velocity.y = 0;
            this.fuelUsage(0.05);
        } else if (cursors.down.isDown && ground.body.touching.up) {
            ground.kill();
            this.fuelUsage(0.1);
        } else if (cursors.right.isDown && playerUnderground && ground.body.touching.left) {
            ground.kill();
            this.fuelUsage(0.1);
        } else if (cursors.left.isDown && playerUnderground && ground.body.touching.right) {
            ground.kill();
            this.fuelUsage(0.1);
        }
    },

    gemPicker: function(player, gem) {
        gem.kill()
        this.playerScore += 10;
        scoreText.text = 'Score: ' + this.playerScore;
    },

    fuelUsage: function(number) {
        this.playerFuel -= number
        playerFuelText.text= 'playerFuel: ' + this.playerFuel
    },

    fillFuel: function(){
        money = this.playerScore;
        missingFuel = 15 - this.playerFuel;
        if (money >= missingFuel) {
            this.playerFuel = 15;
            this.playerScore = money - missingFuel;
        } else if (money < missingFuel && money > 0) {
            this.playerFuel += money;
            this.playerScore = 0;
        }
        scoreText.text = 'Score: ' + this.playerScore;
        playerFuelText.text= 'playerFuel: ' + this.playerFuel;
        
    },

    playerHullDamage: function(number) {
        this.playerHull -= number;
        playerHullText.text = 'playerHull: ' + this.playerHull
        if (this.playerHull <= 0) {
            this.player.kill()
            this.state.start('Game')
        }
    },

    playerFall: function(){
        playerVelocityYText.text = 'playerVelocityY: ' + this.player.body.velocity.y;
        if (this.player.body.velocity.y > 300) {
            let damage = (this.player.body.velocity.y - 300) / 4
            this.playerHullDamage(damage);
        }
    },

    update: function() {
        //the camera will follow the player in the world
        this.game.camera.follow(this.player);

        this.playerFall();

        this.physics.arcade.collide(this.player, this.grounds, this.collisionHandler, null, this);

        this.physics.arcade.overlap(this.player, this.gems, this.gemPicker, null, this);

        this.physics.arcade.overlap(this.player, this.fuelStation, this.fillFuel, null, this);

        if (cursors.left.isDown) {
            this.player.body.velocity.x = -150;
            this.fuelUsage(0.005);
        } else if (cursors.right.isDown) {
            this.player.body.velocity.x = 150;
            this.fuelUsage(0.005);
        } else if (cursors.up.isDown) {
            this.player.body.velocity.y = -150;
            this.fuelUsage(0.005);
        } else {
            this.player.body.velocity.x = 0;
        }
    },

    render: function() {
        // Sprite debug info
        // this.game.debug.spriteInfo(this.player, 32, 32);
        // this.game.debug.spriteCoords(this.player, 32, 128);
}
};