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
        //Make the player
        this.player = new Player(this, 60, 240, "player", 0, true)//.setOrigin(0);
        this.powerUpTest = new Powerup(this, 400, 300, "player", 0, (player) => {player.setScale(2)});
        this.powerUpTest.effect(this.player);
        this.walls = this.add.group({
            runChildUpdate: true
        });
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
}