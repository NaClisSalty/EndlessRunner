class End extends Phaser.Scene {
    constructor(movementStyle) {
        super("endScene");
        
    }
    init(data){
        this.movementStyle = data.move;
    }

    create(){
        this.add.image(0,0, 'mendMenu').setScale(.5).setOrigin(0,0);
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