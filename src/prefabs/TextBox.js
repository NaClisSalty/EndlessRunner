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
        this.scene = scene;
    }
    update(){
        
        if (this.x <-200){
            this.destroy();
            this.scene.p1Score+=this.points;
            console.log(this.scene.p1Score);
        }
    }
}