class End extends Phaser.Scene {
    constructor(movementStyle) {
        super("endScene");
        
    }
    init(data){
        this.movementStyle = data.move;
    }

    preload() {
        this.load.path = './Assets/'
        this.load.image('endMenu', 'end_image.png');
    }

    create(){
        this.add.image(0,0, 'endMenu').setScale(.5).setOrigin(0,0);

        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }

    update(){
        if(Phaser.Input.Keyboard.JustDown(keyLEFT)){
            this.scene.start("menuScene");
        }

        if(Phaser.Input.Keyboard.JustDown(keyRIGHT)){
            this.scene.start("playScene", {move: this.movementStyle});
        }
    }

}