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
        
        //Display the score
        this.scoreLeft = this.add.text(20, 20, this.p1Score, scoreConfig).setDepth(20);

        scoreConfig.fixedWidth = 0;
        timeConfig.fixedWidth = 0;

        //timer

        //Get the time that the scene started since this.time.now is global or something
        this.startTime = this.time.now;
        //Set the timer to how long since the start (should be 0)
        this.timeRight = this.add.text(590, 20, Math.floor((this.time.now-this.startTime)/1000), timeConfig).setDepth(20);


        ///*
        //glitch animation
        this.anims.create({key: 'glitchAnim', frames: 
        this.anims.generateFrameNames('glitch1', 
        { prefix: 'textBlock', end: 4}), 
        frameRate:10,
        repeat: -1});

        

        //this.add.sprite(200,200, 'glitch1').play('glitchAnim').setScale(.10);
        //add onBlur and onFocus
        //*/
        game.events.addListener(Phaser.Core.Events.FOCUS, this._onFocus, this);
        game.events.addListener(Phaser.Core.Events.BLUR, this._onBlur, this);

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
        //Spawn the first enemy
        this.spawnTextBlock()
        
        //Spawn a couple more enemies, later they will spawn themselves
        this.time.delayedCall(1000, this.spawnTextBlock, [], this);
        //Only spawn the third after quite a while to make the game easier when first learning
        this.time.delayedCall(15000, this.spawnTextBlock, [],this);

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
        
        this.music2 = this.sound.add('music2', {loop: true});
        
        //this.music2.play();

        this.music3 = this.sound.add('music3', {loop: true});
        
        //this.music3.play();

        this.music4 = this.sound.add('music4', {loop: true});
        
        //this.music4.play();


        //hacker text initialization
        let hackerConfig = {
            fontFamily: 'Courier',
            fontSize: '14px',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
        }
            


        //Set up all of the hacker taunting code
        this.hackerTauntSlice = 0;
        this.hackerTauntTimer = 0;
        this.hackerIndex = 0;
        this.hackerText = this.add.text(40, 450, "", hackerConfig).setDepth(20);
        this.hackerTauntArray = [];
        this.hackerTauntArray.push(['HELLO WORLD!',' LOL JK, i mean welcome to hell budy!']);
        this.hackerTauntArray.push(['Yeah so,',' I totally hacked your website.']);
        this.hackerTauntArray.push(['If you want to get it back...', 'you have to play my crappy endless runner. ','LOL ;)']);
        this.hackerTauntArray.push(['If you prove your worth ill let you have the site back.', 'Maybe...']);
        this.hackerTauntArray.push(['Yeah so, if you havent figured it out by now,', 'avoid the really blurry badly scaled blocks of lorem ipsum text']);
        this.hackerTauntArray.push(['The other things give you pwers, ','some are helpful...some aren’t']);
        this.hackerTauntArray.push(['Man this is BORING. Lets change something.','NEW MUSIC BABY!']);
        this.hackerTauntArray.push(['How do u like me tunes bruh? ']);
        this.hackerTauntArray.push(['SO FUN!',' MUCH MUSIC! ','WOWOWOWOW!']);
        this.hackerTauntArray.push(['Man don’t you wish that you were, ','I dont know... getting rick rolled by now?']);
        this.hackerTauntArray.push(['Yeah so I forgot to tell you,',' that the website may be a bit unstable….']);
        this.hackerTauntArray.push(['WOw LooK aT aLL ThAt AmaZinG aNiMATion!?@#%$']);
        this.hackerTauntArray.push(['MUSIC CHANGE!',' AWESOME MIX ^( BABY!']);
        this.hackerTauntArray.push(['Man wouldn’t it be funny if i ','started messing with your controls?']);
        this.hackerTauntArray.push(['I mean wouldn’t that be totally lolzers?']);
        this.hackerTauntArray.push(['Don’t worry I’m not that much of a jerk. ','I DEFINITELY wouldn’t do something like that.']);
        this.hackerTauntArray.push(['PSYCHE! ','I mean you saw this coming anyways right? ','Otherwise, I feel bad for your incredible lack of intelligence.',' I mean bigger is always better right ;)']);
        this.hackerTauntArray.push(['Time for some new free of charge tunes. ','Even Hackers respect intellectual property rights man.']);
        this.hackerTauntArray.push(['I feel like its time to screw with you some more. ','So guess what, ','youre gonna be stuck going really slow for a bit.']);
        this.hackerTauntArray.push(['MULTIPLE TRACKS OF MUSIC BABY!']);
        this.hackerTauntArray.push(['EVEN MORE TRACKS OF MUSIC!']);
        this.hackerTauntArray.push(['MOAR MOAR MOAR MOAR! FEED ME SEYMORE!']);
        this.hackerTauntArray.push(['Hey guess what? ','This wholle thing is actually endless and I just made it to mess with you,',' all my messages are preloaded and on repeat. ','Suck it.']);
        

        //Array containing the unlock requirements for each line of text
        this.hackerThresholds = [20, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1200, 1400, 1600, 1800, 2000, 2500, 3000, 3500, 4000, 4500, 5000];
        
    }

    spawnPowerup(){
        //Figure out what kind of powerup it is
        let effect = Math.floor(Math.random() * this.powerAffects.length);
        this.powerups.add(new Powerup(this, 600, Math.random() * 430 + 25, 
                "images", this.powerImages[effect], this.powerAffects[effect], 
                this.powerEnd[effect],).setOrigin(0)).setDepth(5);
    }

    spawnTextBlock(){
        let newTextBlock = new TextBox(this, 600, Math.random() * 430, "textBlock", 0, Math.floor(Math.random() * 50)).setOrigin(0);
        //let newTextBlock = new TextBox(this, 600, Math.random() * 430, "textBlock", 0, 1).setOrigin(0);
        //lets resize them so they dont take up 80% of the sceen
        //newTextBlock.setScale(Phaser.Math.Between(.05, .15),Phaser.Math.Between(.05, .15));
        //Have to give the scales variables to prevent weird behaviour
        let xScale = .5 + Math.random()/10;
        newTextBlock.setScale(.05 + Math.random()/10, .05 + Math.random()/10);
        this.enemies.add(newTextBlock);
    }

    update(time, delta) {
        //tile spritemovement
        this.tile.tilePositionX +=4;
        //this.tile.tilePositionY -=4

        

        //timer
        this.timeRight.text = "" + Math.floor((this.time.now-this.startTime)/1000);

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
    //Also handles changing the score
    checkPoints(newPoints){
        this.p1Score += newPoints;
        this.scoreLeft.text = this.p1Score;


        if(this.p1Score>this.hackerThresholds[this.hackerIndex]){
            let setupInnerIndex = 0;
            let totalPriorTime = 0;
            while(setupInnerIndex < this.hackerTauntArray[this.hackerIndex].length){
                this.time.addEvent({
                    delay: totalPriorTime,
                    callback: this.hackerPrintLine,
                    callbackScope: this,
                    args: [setupInnerIndex, this.hackerIndex]
                })
                totalPriorTime += 100 * this.hackerTauntArray[this.hackerIndex][setupInnerIndex].length + 500;
                setupInnerIndex++;
            }
            this.hackerIndex++;
        }
        //change music to music2
        if(this.p1Score>500){
            this.music1.stop();
            this.music2.play();
        }
        //change text boxes to glitch text
        if(this.p1Score>1000){
            this.
        }
        //music change to music 3
        if(this.p1Score>1200){
            this.music2.stop();
            this.music3.play();
        }
        //increase mouse size temporarily
        if(this.p1Score>2000){
            
        }
        //music change to music4
        if(this.p1Score>2500){
            this.music3.stop();
            this.music4.play();
        }
        //go slow temporarily
        if(this.p1Score>3000){
            
        }
        //multiple music tracks
        if(this.p1Score>3500){
            this.music3.play();
        }
        //3 tracks
        if(this.p1Score>4000){
            this.music2.play();
        }
        //4 tracks
        if(this.p1Score>4500){
            this.music1.play();
        }




    }

    hackerPrintLine(innerIndex, outerIndex){
        this.hackerTauntSlice = 0;
        this.time.addEvent({
            delay: 100,
            repeat: this.hackerTauntArray[outerIndex][innerIndex].length,
            callback: this.hackerSlowTextPrint,
            callbackScope: this,
            args: [innerIndex, outerIndex]
        })
    }

    hackerSlowTextPrint(innerIndex, outerIndex){
        this.hackerTauntSlice++;
        this.hackerText.text = (this.hackerTauntArray[outerIndex][innerIndex].slice(0,this.hackerTauntSlice));
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
        //play sound effects
        this.sound.play('beep');
        this.sound.play('tech_scale');
    }
    enemyCollide(playerObj, enemy){
        if(!this.player.shieldValue){
            //play sound effects
            this.sound.play('bwah');

            console.log("You died!")
            this.player.dead = true;
            this.player.destroy();
            this.music1.stop();
            this.music2.stop();
            this.music3.stop();
            this.music4.stop();
            this.enemies.clear(true, true);   
            this.powerups.clear(true, true);
            this.scene.start("endScene", {move: this.movementStyle, 
                                points: this.p1Score,
                                time: this.time.now - this.startTime});
        }
        else{
            //play sound effects
            this.sound.play('bwop');
            this.player.shieldValue = false;
            //Need to give the player credit for the thing dying, and also spawn a new one
            //Only should spawn a new one if the enemy hasn't yet
            if(!enemy.spawned)
                this.spawnTextBlock();
            this.checkPoints(enemy.points);
            //Then kill the enemy
            this.enemies.remove(enemy, false, true);
        }
        
        
    }
}