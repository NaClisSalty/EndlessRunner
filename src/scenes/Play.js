class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }
    init(data){

    }

    preload() {
        this.load.image("player","./Assets/PlayerPlaceholder.png")
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
        this.player = new Player(this, 20, 240, "player", 0);
    }
    update() {
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
        this.player.update(this.input.activePointer.x, this.input.activePointer.y); 
        //this.physics.accelerateTo(this.player, this.player.x, this.input.activePointer.y);
    }

    _onFocus() {
        this.paused = false;
        console.log("Hi!")
    }
    _onBlur() {
        this.paused = true;
        console.log("Bye!")
    }
}