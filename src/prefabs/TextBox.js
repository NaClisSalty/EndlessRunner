//Ethan Salzman

class TextBox extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame, pointValue) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.points = pointValue;
    }


    update(){
        //move textbox left
        this.x -= game.settings.boxSpeed;
        //no wraparound code since (i presume) that incoming objects are randomized
    }

}



