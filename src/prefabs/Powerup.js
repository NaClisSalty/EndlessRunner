class Powerup extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture, frame, funct, antiFunct) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        //this.setCollideWorldBounds(true);
        this.setImmovable(true);
        this.setVelocityX(-20);
        //Store the effect of the powerup and how to undo it
        this.effect = funct;
        this.endEffect = antiFunct;
        //Need to store the scene to process activation
        this.scene = scene;
    }

    //Activate the effects of the powerup on the player
    activate(){
        this.effect(this.scene.player);
        this.scene.time.addEvent({
            delay: 10000,
            callback: this.endEffect(this.scene.player),
        })
        this.scene.spawnPowerup();
        this.destroy();
    }

    /*
    Powerups we want:
    1) Make the player bigger
    2) Make the player smaller
    3) Give the player a shield
    4) Increase player speed
    5) Decrease player speed
    6) set player equal to mouse
    7) player automatically shoots objects to hit and destroy obstacles
    8) Mabey one special character that picks one of the above poerups but the effect is permanent
    9) Increase obstacle and powerup speed
    10) Cursor/ Player will now temporarily destroy obstacles on contact (star invincibility from mario)

    */

    playerGoBig(player){
        //increase player cursor size temporarily
        this.player.setScale(2);
    }
    playerGoSmall(player){
        this.player.setScale(.5);
    }
    playerGetShield(player){
        this.player.shieldValue = true;
    }
    playerGoFast(player){
        this.player.kp+1000;
    }
    playerGoSlow(player){
        this.player.kp*.5;
    }
    playerIsMouse(player){
        //???
    }
    /*
    playerShoot(){

    }
    permanentPower(){

    }
    allSpeedUp(){

    }
    marioStarPower(){

    }
    */
    update(){
        //speed for upgrades
        //this.x -= game.settings.powerSpeed;
        if (this.x <40){
            this.scene.spawnPowerup();
            this.destroy();
        }
    }

    checkPower(){
        //function to check which powerup it is based off of the image file assigned to it
        //may need to be in a diff .js file
    }

    randomizePower(){
        //function to randomize powerups as the are created (may need to be in a differnt .js file)
    }


}