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
        this.load.image("textBlock","text_block_01.PNG");
    }

    create() {

        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '20px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        this.add.text(320, 240, 'Press left for 2d movement, right for 1d', menuConfig).setOrigin(0.5);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        //this.add.sprite(x,y, 'key', 'frame_name');
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