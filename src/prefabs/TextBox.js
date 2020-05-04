//Ethan Salzman

class TextBox extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture, frame, pointValue) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.points = pointValue;
        scene.physics.add.existing(this);
        this.setImmovable(true);
        //speed
        this.setVelocityX(-125 - (scene.time.now * 0.005));
        //Check to see if it's made the next barrier
        this.spawned = false;
    }
    update(){
        if(!this.spawned && this.x <= 150){
            this.spawned = true;
            this.scene.spawnTextBlock();
        }

        if (this.x <= -this.width * this.scaleX){
            this.scene.p1Score+=this.points;
            this.scene.scoreLeft.text = this.scene.p1Score;
            this.scene.checkPoints();
            this.scene.enemies.remove(this, false, true);
        }
    }
}