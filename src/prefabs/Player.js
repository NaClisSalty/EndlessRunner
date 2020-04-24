class Player extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.body.setDragY(20);
    }

    update(mouseX, mouseY){
        if(Math.abs(mouseY-this.y) < 50)
            this.setAccelerationY((this.y - mouseY));
        else
            this.setAccelerationY((mouseY-this.y));
    }
}