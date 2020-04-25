class Player extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setCollideWorldBounds(true);
        this.setImmovable(true);
        //Pid controller stuff for movement/mouse tracking
        //Abandon hope, all ye who seek to understand this without outside knowledge
        //Credit for implementation goes to Feedback Control for Computer Systems
        //By Philipp K. Janert, part of the O'Reilly books
        this.kp = 60; //amount to change position based on difference between mouse pos and player pos
        this.ki = 0.0005; //Amount to change position based on previous error
        this.kd = 7000; //Supposedly predicts future movement, but that's not the effect I've noticed
        
        this.i = 0; //tracks cumulative error
        this.prior = 0; //Tracks previous error

        this.xi = 0; //tracks cumulative error
        this.xprior = 0; //Tracks previous error
    }

    update(mouseX, mouseY, dT){
        //Need to know the error/difference a lot, so just define it
        let difference = mouseY - this.y;
        //Add to the cumulative error the new change
        this.i += difference * dT;
        //Define the difference between previous and current error
        let d = (difference - this.prior)/dT;
        this.prior = difference;

        this.setAccelerationY(this.kp * difference + this.ki * this.i + d * this.kd);

        //Need to know the error/difference a lot, so just define it
        let differencex = mouseX - this.x;
        //Add to the cumulative error the new change
        this.xi += differencex * dT;
        //Define the difference between previous and current error
        let dx = (differencex - this.xprior)/dT;
        this.xprior = differencex;

        this.setAccelerationX(this.kp * differencex + this.ki * this.i + dx * this.kd);
    }
}