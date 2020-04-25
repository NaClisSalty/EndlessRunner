class Powerup extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
    }

    update(){
        //speed for upgrades
        this.x -= game.settings.powerSpeed;
    }

    checkPower(){
        //function to check which powerup it is based off of the image file assigned to it
        //may need to be in a diff .js file
    }

    randomizePower(){
        //function to randomize powerups as the are created (may need to be in a differnt .js file)
    }


}