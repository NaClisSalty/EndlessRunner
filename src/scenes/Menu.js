class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }
    init(data) {

    }
    preload() {

    }
    create() {

    }

    update() {
        this.scene.start("playScene");    

    }
}