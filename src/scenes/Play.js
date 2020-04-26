class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }
    init(data){

    }

    preload() {
    } 

    create() {
        //add onBlur and onFocus
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
        this.powerAffects.push((player) => {player.kp+=1000});
        this.powerAffects.push((player) => {player.kp*=.5});
        this.powerAffects.push((player) => {player.kd *= 10});

        //Every power needs a way to undo itself, this array stores those functions
        this.powerEnd = [];
        this.powerEnd.push((player) => {player.setScale(.5)});
        this.powerEnd.push((player) => {player.setScale(2)});
        this.powerEnd.push((player) => {player.shieldValue = false});
        this.powerEnd.push((player) => {player.kp-=1000});
        this.powerEnd.push((player) => {player.kp*= 2});
        this.powerEnd.push((player) => {player.kd /= 10});
        //Make the player
        this.player = new Player(this, 60, 240, "player", 0, true)//.setOrigin(0);
        this.powerUpTest = new Powerup(this, 400, 300, "player", 0, Math.floor(this.powerAffects[Math.random() * this.powerAffects].length));
        this.powerUpTest.effect(this.player);
        //set up groups for powerups and barriers
        this.walls = this.add.group({
            runChildUpdate: true
        });
        this.powerups = this.add.group({
            runChildUpdate: true
        })
    }
    update(time, delta) {
        //update all objects in gameObjects
        this.gameObjects.forEach(function(obj) {
            obj.update();
        },this);
        //if enabled outline all gameObjects
        //useful for seeing hitbox or completely transparent objects
        if (this.debugmode) {
            this.renderdebug.clear();
            this.gameObjects.forEach(function(obj){
                this.renderdebug.lineStyle(3, 0xfacade);
                this.renderdebug.strokeRectShape(new Phaser.Geom.Rectangle(
                    obj.x,obj.y,obj.width,obj.height));
            },this);
        }
        this.player.update(this.input.activePointer.x, this.input.activePointer.y, delta); 
        
        this.physics.world.collide(this.player, this.walls, this.wallCollide, null, this);
    }

    _onFocus() {
        this.paused = false;
        console.log("Hi!")
    }
    _onBlur() {
        this.paused = true;
        console.log("Bye!")
    }

    wallCollide(){
        this.player.x = 60;
        this.player.y = 240;
    }
}