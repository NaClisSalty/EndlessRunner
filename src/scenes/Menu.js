class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }
    init(data) {

    }
    preload() {
        this.load.path = './Assets/'
        this.load.image("player","PlayerPlaceholder.png");
        this.load.atlas("images", "typeObjects.png", "sprites.json");
    }

    create() {
        //this.add.sprite(x,y, 'key', 'frame_name');
    }

    update() {
        this.scene.start("playScene");    

    }
}