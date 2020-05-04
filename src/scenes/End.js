class End extends Phaser.Scene {
    constructor(movementStyle) {
        super("endScene");
        
    }
    init(data){
        this.movementStyle = data.move;
        this.timeSurvived = data.time;
        this.score = data.points;
    }

    preload() {
        this.load.path = './Assets/'
        this.load.image('endMenu', 'end_image.png');
    }

    create(){
        let endConfig = {
            fontFamily: 'Neo Sans',
            fontSize: '32px',
            color: '#000000',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
        }
        this.add.image(0,0, 'endMenu').setScale(.5).setOrigin(0,0);
        this.add.text(game.config.width/3 - 104, game.config.height/2 -40, this.score, endConfig).setOrigin(0)
        this.add.text(game.config.width/3 * 2 + 12, game.config.height/2 -40, Math.floor(this.timeSurvived/1000), endConfig).setOrigin(0)
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