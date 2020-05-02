class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }
    init(data){
        this.movementStyle = data.move;
    }

    preload() {
        //preload 4 diff music options
        this.load.path = './Assets/'
        this.load.audio('music1', 'music1.wav');
        this.load.audio('music2', 'music2.wav');
        this.load.audio('music3', 'music3.wav');
        this.load.audio('music4', 'music4.wav');

        //preload sound effects
        this.load.audio('bwah', 'bwah.wav');
        this.load.audio('beep', 'beep.wav');
        this.load.audio('bwop', 'bwop.wav');
        this.load.audio('snare', 'snare.wav');
        this.load.audio('tech_scale', 'rythmic_tech_sound.mp3');
        //atlas for glitch sprite
        this.load.atlas('glitch1', 'glitchText.png', 'glitchText.json');

        //tile sprite image
        this.load.image('tile', 'tileSprite1.png');
    } 

    create() {
        //create tilesprite
        this.tile = this.add.tileSprite(0,0, 1437, 1447, 'tile').setOrigin(0,0).setDepth(-100);

        //timer and points

        //score
        this.p1Score = 0;

        //score display
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#00BCFF',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }
        //create a timer and way to check wich difficulty option was chosen
        let startTime = 0;
        this.startTime = 0;
        let timeConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#00BCFF',
            color: '#843605',
            align: 'left',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }
        
        this.scoreLeft = this.add.text(20, 20, this.p1Score, scoreConfig);

        scoreConfig.fixedWidth = 0;
        timeConfig.fixedWidth = 0;

        //timer
        
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            
        }, null, this);
        
        this.timeRight = this.add.text(590, 20, this.startTime +this.clock.getElapsedSeconds(), timeConfig)






        ///*
        //glitch animation
        this.anims.create({key: 'glitchAnim', frames: 
        this.anims.generateFrameNames('glitch1', 
        { prefix: 'textBlock', end: 4}), 
        frameRate:10,
        repeat: -1});

        

        //this.add.sprite(200,200, 'glitch1').play('glitchAnim');
        //add onBlur and onFocus
        //*/
        game.events.addListener(Phaser.Core.Events.FOCUS, this._onFocus, this);
        game.events.addListener(Phaser.Core.Events.BLUR, this._onBlur, this);

        //Code to speed up objects as game goes on
        //Need to track time since start
        this.speedUpFactor = 0;

        


        //define mouse
        game.input.mouse.capture = true;

        //flags
        this.gameOver = false;
        this.paused = false;
        this.debugMode = false;
        if (this.debugmode) {
            this.renderdebug = this.add.graphics();
        }

        //game object arrays
        this.gameObjects = [];

        //powerArray, contains all possible powerups/their effects
        this.powerAffects = [];
        this.powerAffects.push((player) => {player.setScale(2)});
        this.powerAffects.push((player) => {player.setScale(.5)});
        this.powerAffects.push((player) => {player.shieldValue = true});
        this.powerAffects.push((player) => {player.kp *= 2});
        this.powerAffects.push((player) => {player.kp*=.5});
        this.powerAffects.push((player) => {player.kd =15000});

        //Every power needs a way to undo itself, this array stores those functions
        this.powerEnd = [];
        this.powerEnd.push((player) => {player.setScale(1)});
        this.powerEnd.push((player) => {player.setScale(1)});
        this.powerEnd.push((player) => {player.shieldValue = false});
        this.powerEnd.push((player) => {player.kp/= 2});
        this.powerEnd.push((player) => {player.kp*= 2});
        this.powerEnd.push((player) => {player.kd =7000});
        
        //Stores list of corresponding names of images in the atlas to use for each powerup
        this.powerImages = [];
        this.powerImages.push('plus');
        this.powerImages.push('Minus');
        this.powerImages.push('at');
        this.powerImages.push('forward_slash');
        this.powerImages.push('back_slash');
        this.powerImages.push('Equals');

        //Make the player
        this.player = new Player(this, 60, 240, "player", 0, this.movementStyle);
        //set up groups for powerups and barriers
        this.powerups = this.add.group({
            runChildUpdate: true
        })
        //Spawn the first powerup and start the timer for the next one to spawn
        this.spawnPowerup();
        this.powerupTimer = 0;

        //group for text boxes
        this.enemies = this.add.group({
            runChildUpdate: true
        })
        //Spawn the first enemy and init the timer to spawn more
        this.spawnTextBlock()
        this.enemyTimer = 0;

        //starts to play music
        //initalizes music tracks
        let music1 =0;
        let music2 =0;
        let music3 =0;
        let music4 =0;

        this.music1 = this.sound.add('music1', {loop: true});
        //music1.setLoop(true);
        this.music1.play();
        //comment to test merge
        /*
        this.music2 = this.sound.add('music2');
        music2.setLoop(true);
        //this.music2.play();

        this.music3 = this.sound.add('music3');
        music3.setLoop(true);
        //this.music3.play();

        this.music4 = this.sound.add('music4');
        music4.setLoop(true);
        //this.music4.play();
            */

        
    }

    spawnPowerup(){
        //Figure out what kind of powerup it is
        let effect = Math.floor(Math.random() * this.powerAffects.length);
        this.powerups.add(new Powerup(this, 600, Math.random() * 430 + 25, 
                "images", this.powerImages[effect], this.powerAffects[effect], 
                this.powerEnd[effect],).setOrigin(0)).setDepth(100);
    }

    spawnTextBlock(){
        let newTextBlock = new TextBox(this, 600, Math.random() * 430, "textBlock", 0, Math.floor(Math.random() * 50)).setOrigin(0);
        //lets resize them so they dont take up 80% of the sceen
        newTextBlock.setDisplaySize(Phaser.Math.Between(50, 200),Phaser.Math.Between(50, 200));
        this.enemies.add(newTextBlock);
    }

    update(time, delta) {
        //Increase the time since the game started
        this.speedUpFactor += delta;
        //tile spritemovement
        this.tile.tilePositionX +=4;
        //this.tile.tilePositionY -=4

        
        this.scoreLeft.text = this.p1Score;
        console.log(this.p1Score);
        

        //timer
        this.timeRight.text = Math.floor(this.startTime +this.clock.getElapsedSeconds());

        //console.log(this.powerupTimer);
        //update all objects in gameObjects
        // this.gameObjects.forEach(function(obj) {
        //     obj.update();
        // },this);
        //if enabled outline all gameObjects
        //useful for seeing hitbox or completely transparent objects
        // if (this.debugmode) {
        //     this.renderdebug.clear();
        //     this.gameObjects.forEach(function(obj){
        //         this.renderdebug.lineStyle(3, 0xfacade);
        //         this.renderdebug.strokeRectShape(new Phaser.Geom.Rectangle(
        //             obj.x,obj.y,obj.width,obj.height));
        //     },this);
        // }
        if (!this.player.dead) {
            this.player.update(this.input.activePointer.x, this.input.activePointer.y, delta); 
            
            this.physics.world.collide(this.player, this.walls, this.wallCollide, null, this);

            this.physics.world.collide(this.player, this.powerups, this.powerCollide, null, this);

            this.physics.world.collide(this.player, this.enemies, this.enemyCollide, null, this);

            //timer for spawning the baddies
            this.enemyTimer+= delta;
            if(this.enemyTimer >= 3000){
                this.spawnTextBlock();
                this.enemyTimer = 0;
            }
            //Increment the powerup spawn timer, then see if it's time for another one, and if it is then spawn it
            this.powerupTimer += delta;
            if(this.powerupTimer >= 5000){
                this.powerupTimer = 0;
                this.spawnPowerup();
            }
        }
    }

    //function to check players score, 
    //at various values hacker will talk to player and mess with the game
    checkPoints(p1Score){
        if(this.p1Score>20){

        }
    }


    _onFocus() {
        this.paused = false;
        console.log("Hi!")
    }
    _onBlur() {
        this.paused = true;
        console.log("Bye!")
    }
    //This function only exists because we can't know what powerup the player hit in collision()
    powerCollide(playerObj, powerup){
        //Just make the powerup deal with it
        powerup.activate();
        this.sound.play('beep');
        this.sound.play('tech_scale');
    }
    enemyCollide(playerObj, enemy){
        this.enemies.remove(enemy, false, true);
        if(!this.player.shieldValue){
            this.sound.play('bwah');
            console.log("You died!")
            this.player.dead = true;
            this.player.destroy();
            this.enemies.clear(true, true);   
            this.powerups.clear(true, true);
        }
        else
            this.sound.play('bwop');
            this.player.shieldValue = false;
    }
}