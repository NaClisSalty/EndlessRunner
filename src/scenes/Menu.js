class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }
    preload() {
        this.load.path = './Assets/'
        this.load.image("player","Player.png");
        this.load.atlas("images", "typeObjects.png", "sprites.json");
        this.load.image("textBlock","text_block_01.PNG");
        this.load.image('menu', 'menu_image.png');
    }

    create() {
        //Option selection taken from rocket patrol
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        this.add.image(0,0, 'menu').setScale(.5).setOrigin(0,0);
    }

    update() {  
        if(Phaser.Input.Keyboard.JustDown(keyLEFT)){
            this.scene.start("playScene", {move: true});
        }

        if(Phaser.Input.Keyboard.JustDown(keyRIGHT)){
            this.scene.start("playScene", {move: false});
        }
    }
}