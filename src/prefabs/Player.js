class Player extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        scene.physics.add.existing(this);

        //Pid controller stuff for movement/mouse tracking
        //Abandon hope, all ye who seek to understand this without outside knowledge
        //Credit for implementation goes to Feedback Control for Computer Systems
        //By Philipp K. Janert, part of the O'Reilly books
        this.kp = 10; //amount to change position based on difference between mouse pos and player pos
        this.ki = 0.001; //Amount to change position based on previous error
        this.kd = 1500; //Supposedly predicts future movement, but that's not the effect I've noticed
        
        this.i = 0; //tracks cumulative error
        this.prior = 0; //Tracks previous error
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
    }
}