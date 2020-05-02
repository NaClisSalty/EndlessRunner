//Ethan Salzman

class TextBox extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture, frame, pointValue) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.points = pointValue;
        scene.physics.add.existing(this);
        this.setImmovable(true);
        //speed
        this.setVelocityX(-125 - (scene.speedUpFactor * 0.005));
    }
    update(){
        
        if (this.x <-200){
            this.scene.p1Score+=this.points;
            //this.scoreLeft.text = this.p1Score;
            this.scene.enemies.remove(this, false, true);
        }
    }
}