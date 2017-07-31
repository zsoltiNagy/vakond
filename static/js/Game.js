var Vakond = Vakond || {};

Vakond.Game = function(){};

Vakond.Game.prototype = { 
    create: function() {
        //background should be repetitive till certain y value
        this.sky = this.add.tileSprite(0, 0, 640, 480, 'sky');

        //create grounds
        this.grounds = this.add.physicsGroup();

        for (let y = 240; y < this.world.height; y += 32) {
            for (let x = 0; x < this.world.width; x += 32) {
                var ground = this.grounds.create(x, y, 'ground');
            }
        }

        this.grounds.setAll('body.allowGravity', false);
        this.grounds.setAll('body.immovable', true);


        //this.ground = this.add.tileSprite(0, 240, 640, 480, 'ground');
        //this.physics.arcade.enable(this.ground);
        //this.ground.body.immovable = true;

        //create player
        this.player = this.add.sprite(0, 0, 'player');
        this.physics.arcade.enable(this.player);
        this.player.body.collideWorldBounds = true;
        this.player.body.bounce.y = 0.2;
        this.player.body.gravity.y = 300;
        this.player.anchor.setTo(0.5);

        // Controls
        cursors = this.input.keyboard.createCursorKeys();

    },

    collisionHandler(player, ground){
        if (cursors.up.isDown) {
            this.player.body.velocity.y = 0;
        } else if (cursors.down.isDown) {
            ground.kill()
        } else if (cursors.right.isDown && player.body.touching.down) {
            ground.kill()
        } else if (cursors.left.isDown && player.body.touching.down) {
            ground.kill()
        }
    },

    update: function() {
        this.physics.arcade.collide(this.player, this.grounds, this.collisionHandler, null, this);
        if (cursors.left.isDown) {
            this.player.body.velocity.x = -150;
        } else if (cursors.right.isDown) {
            this.player.body.velocity.x = 150;
        } else if (cursors.up.isDown) {
            this.player.body.velocity.y = -150;
        } else {
            this.player.body.velocity.x = 0;
        }
    }
};