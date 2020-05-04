class Powerup extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture, frame, funct, antiFunct) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        //this.setCollideWorldBounds(true);
        this.setImmovable(true);
        this.setVelocityX(-75 - (scene.time.now * 0.005));
        //Store the effect of the powerup and how to undo it
        this.effect = funct;
        this.endEffect = antiFunct;
        //Need to store the scene to process activation
        this.scene = scene;
        //time effect lasts in seconds
        this.duration = 10
    }

    //Resolve powerup collision with player
    activate(){
        //Activate the effects of the powerup on the player
        this.effect(this.scene.player);
        //Turn it off later
        this.scene.time.delayedCall(this.duration*1000, this.endEffect, [this.scene.player], this);
        //Get rid of this powerup
        this.scene.powerups.remove(this, false, true);
    }

    /*
    Powerups we want:
    1) Make the player bigger
    2) Make the player smaller
    3) Give the player a shield
    4) Increase player speed
    5) Decrease player speed
    6) set player equal to mouse

    */
    update(){
        //speed for upgrades
        //this.x -= game.settings.powerSpeed;
        if (this.x <-100){
            this.destroy();
        }
    }

}