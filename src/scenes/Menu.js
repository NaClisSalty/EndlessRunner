class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }
    init(data) {

    }
    preload() {
        this.load.atlas('map', 'typeObjects.png', 'sprites.json');
    }
    create() {
        this.add.sprite(x,y, 'key', 'frame_name');
    }

    update() {
        this.scene.start("playScene");    

    }
}