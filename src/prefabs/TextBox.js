//Ethan Salzman

class TextBox extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture, frame, pointValue) {
        //set up basic properties
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        //Make sure it doesn't bounce off things
        this.setImmovable(true);
        //Store the score
        this.points = pointValue;
        //speed
        this.setVelocityX(Math.max(-125 - ((scene.time.now-scene.startTime)* 0.005)), -175);
        //Check to see if it's made the next barrier
        this.spawned = false;
    }
    update(){
        //This code is somewhat taken from paddleParkour
        if(!this.spawned && this.x <= 150){
            this.spawned = true;
            this.scene.spawnTextBlock();
        }

        if (this.x <= -this.width * this.scaleX){
            this.scene.checkPoints(this.points);
            this.scene.enemies.remove(this, false, true);
        }
    }
}