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

        //powerArray
        this.powerAffects = [];
        this.powerAffects.push((player) => {player.setScale(2)});
        this.powerAffects.push((player) => {player.setScale(.5)});
        this.powerAffects.push((player) => {player.shieldValue = true});
        this.powerAffects.push((player) => {player.kp+10});
        this.powerAffects.push((player) => {player.kp*.5});
        this.powerAffects.push(function(player) {console.log("test!")});
        this.powerAffects.push(function(player) {player.setScale(2);return true});


        //Make the player
        this.player = new Player(this, 60, 240, "player", 0, true)//.setOrigin(0);
        var rand = 6;//Math.floor(Math.random() * this.powerAffects.length-1);
        //this.powerUpTest = new Powerup(this, 400, 300, "cash", 0, this.powerAffects[rand]);
        
        //this.powerUpTest.effect(this.player);
        //console.log(this.testPowerSprite.effect);
        //this.testPowerSprite.effect();
        this.wallsGroup = this.add.group({
            runChildUpdate: true
        });

        //this.addWall();
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
        
        this.physics.world.collide(this.player, this.walls, this.playerCollide, null, this);
    }

    _onFocus() {
        this.paused = false;
        console.log("Hi!")
    }
    _onBlur() {
        this.paused = true;
        console.log("Bye!")
    }

    playerCollide(){

    }
    addWall() {
        var wall = new TextBox(this, 60, 240, "cash", 0, 10);
        this.wallsGroup.add(wall);
    }
}