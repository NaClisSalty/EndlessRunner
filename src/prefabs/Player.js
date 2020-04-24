class Player extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        scene.physics.add.existing(this);
    }

    update(mouseX, mouseY){
        console.log(mouseX);
        console.log(mouseY);
        this.setVelocityY((mouseY - this.y)/2);
    }
}