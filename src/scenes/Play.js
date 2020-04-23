class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }
    init(data){

    }

    preload() {

    } 

    create() {
        game.events.addListener(Phaser.Core.Events.FOCUS, this._onFocus, this);
        game.events.addListener(Phaser.Core.Events.BLUR, this._onBlur, this);
    }
    update() {
        
    }

    _onFocus() {
        this.pauseGame(false);
    }
    _onBlur() {
        this.pauseGame(true);
    }
}