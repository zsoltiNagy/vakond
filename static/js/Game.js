var Vakond = Vakond || {};

Vakond.Game = function(){};

Vakond.Game.prototype = { 
    create: function() {
        // World size
        this.world.resize(800, 1920);
        // Global variables
        this.groundFloor = 240;
        // Background
        this.sky = this.add.tileSprite(0, 0, this.world.width, this.groundFloor, 'sky');
        this.cave = this.add.tileSprite(0, this.groundFloor, this.world.width, this.world.height, 'cave');
        // Grounds
        this.grounds = this.add.physicsGroup();
        for (let y = this.groundFloor; y < this.world.height; y += 16) {

            for (let x = 0; x < this.world.width; x += 16) {
                var ground = this.grounds.create(x, y, 'ground');
                ground.scale.setTo(2, 2);
            }
        }
        this.grounds.setAll('body.allowGravity', false);
        this.grounds.setAll('body.immovable', true);
        // Audio
        var music = this.add.audio('music');
        music.play();
        var mute = this.game.add.button(600, 10, 'mute', function () {
            if(this.game.sound) {
                this.game.sound.mute = true;
            } else {
                this.game.sound.mute = false;
            }
        }, this, 2,1,0);
        mute.width = 30;
        mute.height = 30;
        mute.fixedToCamera = true;
        
        // Gems
        this.gems = this.add.physicsGroup();
        for (let counter = 0; counter < 100; counter++) {
            let x = this.getRandomInt(0, this.world.width);
            let y = this.getRandomInt(this.groundFloor+20, this.world.height);
            var gem = this.gems.create(x, y, 'gems', this.getRandomInt(0, 3));
            gem.scale.setTo(2, 2);
        }
        this.gems.setAll('body.allowGravity', false);
        this.gems.setAll('body.immovable', true);
        // Fuel Station
        this.fuelStation = this.add.sprite(64, this.groundFloor-64, 'building');
        this.physics.arcade.enable(this.fuelStation);
        this.fuelStation.scale.setTo(2, 2);
        this.fuelStation.body.allowGravity = false;
        this.fuelStation.body.immovable = true;
        // Repair Station
        this.repairStation = this.add.sprite(384, this.groundFloor-64, 'building');
        this.physics.arcade.enable(this.repairStation);
        this.repairStation.scale.setTo(2, 2);
        this.repairStation.body.allowGravity = false;
        this.repairStation.body.immovable = true;
        // Player
        this.player = this.add.sprite(0, 0, 'player');
        this.physics.arcade.enable(this.player);
        this.player.body.collideWorldBounds = true;
        this.player.body.bounce.y = 0.2;
        this.player.body.gravity.y = 800;
        this.player.scale.setTo(1.2, 1.2);
        this.player.anchor.setTo(0.5);

        this.player.animations.add('mine', [0,1,2,3], 20, true);
        this.player.animations.add('fly', [4,5], 20, true);

        // playerVelocity
        this.playerVelocityY = 0;
        playerVelocityYText = this.add.text(16, 48, 'playerVelocityY: ', { fontSize: '12px', fill: '#000' });
        playerVelocityYText.text = 'playerVelocityY: ' + this.playerVelocityY;
        playerVelocityYText.fixedToCamera = true;
        // Hull
        this.playerHull = 200;
        playerHullText = this.add.text(16, 80, 'playerHull: ', { fontSize: '12px', fill: '#000'});
        playerHullText.text = 'playerHull: ' + this.playerHull;
        playerHullText.fixedToCamera = true;
        // Fuel
        this.playerFuel = 15;
        playerFuelText = this.add.text(16, 112, 'playerFuel: ', { fontSize: '12px', fill: '#000'});
        playerFuelText.text = 'playerFuel: ' + this.playerFuel;
        playerFuelText.fixedToCamera = true;
        // Controls
        cursors = this.input.keyboard.createCursorKeys();
        // Score
        this.playerScore = 0;
        scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '12px', fill: '#000' });
        scoreText.text = 'Score: ' + (this.playerScore).toFixed(2);
        scoreText.fixedToCamera = true;
        // Ground Particle Emitter
        this.groundParticleEmitter = this.add.emitter();
        this.groundParticleEmitter.makeParticles('ground-particle');
        this.groundParticleEmitter.gravity = 400;
        this.groundParticleEmitter.bounce.setTo(10,10);
    },

    groundStorm: function(x,y) {
        this.groundParticleEmitter.x = x;
        this.groundParticleEmitter.y = y;
        this.groundParticleEmitter.start(true, 4000, null, 1);
    },

    getRandomInt: function(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },


    collisionHandler: function(player, ground){
        let playerUnderground = this.player.body.touching.down && player.y > this.groundFloor+32 && !cursors.down.isDown
        let playerBuildingOverlap = this.physics.arcade.overlap(this.player, this.fuelStation) || this.physics.arcade.overlap(this.player, this.repairStation)
        if (cursors.up.isDown) {
            this.player.body.velocity.y = 0;
            this.fuelUsage(0.05);
            this.player.animations.play('fly');
        } else if (cursors.down.isDown && ground.body.touching.up && !playerBuildingOverlap) {
            this.player.animations.play('mine');
            this.groundStorm(ground.x, ground.y);
            ground.kill();
            this.fuelUsage(0.1);
        } else if (cursors.right.isDown && playerUnderground && ground.body.touching.left) {
            ground.kill();
            this.groundStorm(ground.x, ground.y);
            this.fuelUsage(0.1);
        } else if (cursors.left.isDown && playerUnderground && ground.body.touching.right) {
            ground.kill();
            this.groundStorm(ground.x, ground.y);
            this.fuelUsage(0.1);
        }
    },
    gemPicker: function(player, gem) {
        gem.kill()
        this.playerScore += 10;
        scoreText.text = 'Score: ' + (this.playerScore).toFixed(2);
    },

    fuelUsage: function(number) {
        this.playerFuel = (this.playerFuel - number).toFixed(2);
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
        scoreText.text = 'Score: ' + (this.playerScore).toFixed(2);
        playerFuelText.text= 'playerFuel: ' + this.playerFuel;
    },

    repairHull: function(){
        money = this.playerScore;
        damagedHull = 200 - this.playerHull;
        if (money >= damagedHull) {
            this.playerHull = 200;
            this.playerScore = money - damagedHull;
        } else if (money < damagedHull && money > 0) {
            this.playerHull += money;
            this.playerScore = 0;
        }
        scoreText.text = 'Score: ' + (this.playerScore).toFixed(2);
        playerHullText.text= 'playerHull: ' + this.playerHull;
    },

    playerHullDamage: function(number) {
        this.playerHull -= number;
        playerHullText.text = 'playerHull: ' + (this.playerHull).toFixed(2);
        if (this.playerHull <= 0) {
            this.player.kill()
            this.state.start('Game')
        }
    },

    playerFall: function(){
        playerVelocityYText.text = 'playerVelocityY: ' + (this.player.body.velocity.y).toFixed(2);
        if (this.player.body.velocity.y > 500) {
            let damage = (this.player.body.velocity.y - 500) / 4
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

        this.physics.arcade.overlap(this.player, this.repairStation, this.repairHull, null, this);

        if (cursors.left.isDown) {
            this.player.animations.play('mine');
            this.player.body.velocity.x = -200;
            this.fuelUsage(0.005);
        } else if (cursors.right.isDown) {
            this.player.animations.play('mine');
            this.player.body.velocity.x = 200;
            this.fuelUsage(0.005);
        } else if (cursors.up.isDown) {
            this.player.body.velocity.y = -300;
            this.fuelUsage(0.005);
        } else if (cursors.down.isDown) {
            //
        } else {
            this.player.body.velocity.x = 0;
            this.player.animations.stop();
            this.player.frame = 0;
        }
    },

    render: function() {
        // Sprite debug info
        // this.game.debug.spriteInfo(this.player, 32, 32);
        // this.game.debug.spriteCoords(this.player, 32, 128);
    }
};