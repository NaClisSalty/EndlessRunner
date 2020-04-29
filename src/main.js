//music credit to: 
//https://freesound.org/people/DDmyzik/sounds/496423/
//https://freesound.org/people/waveplay./sounds/222474/
//https://freesound.org/people/Disquantic/sounds/474934/
//https://freesound.org/people/djgriffin/sounds/21157/
//name:
//CMPM 120
//Ian Monahan
//
//
let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    backgroundColor: 0x02BBFF,
    scene:[Menu, Play],
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
            gravity: {
                x: 0,
                y: 0
            },
            checkCollision: {
                up: true,
                down: true,
            },
            width: 640,
            height:480,
        }
    },
};

let game = new Phaser.Game(config);

//define game settings
game.settings = {
    spaceshipSpeed: 3,
    spaceshipSpeed2: 5,
    gameTimer: 60000
}


//reserve some keyboard variables
let keyF, keyLEFT, keyRIGHT;