//music credit to: 
//https://freesound.org/people/DDmyzik/sounds/496423/
//https://freesound.org/people/waveplay./sounds/222474/
//https://freesound.org/people/Disquantic/sounds/474934/
//https://freesound.org/people/djgriffin/sounds/21157/

//sound credit to:
//https://freesound.org/people/Soughtaftersounds/sounds/145461/
//https://freesound.org/people/waveplay./sounds/384843/
//https://freesound.org/people/bean%20jamin/sounds/416923/
//https://freesound.org/people/murkertrer/sounds/395444/
//https://freesound.org/people/MATTIX/sounds/453137/
//name:
//CMPM 120
//Ian Monahan
//Ethan Salzman
//Darcy Phipps

/*
Creative tilt: technical side
We implemented a PID controller for player movement, used same implementation for the x and y axis
Took a lot of work to fine-tune, feel that I gained a lot of knowledge from the process.
Despite the pain, I think it turned out really nicely, so picked it to highlight here
*/

let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    backgroundColor: 0x02BBFF,
    scene:[Menu, Play, End],
    backgroundColor: 'rgba(255,110,110,0.5)',
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
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
    gameTimer: 6000000000000
}


//reserve some keyboard variables
let keyLEFT, keyRIGHT;