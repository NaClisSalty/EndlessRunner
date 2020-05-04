class Player extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture, frame, multiDMove) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setCollideWorldBounds(true);
        this.setImmovable(true);
        //did we die!
        this.dead = false;
        //Pid controller stuff for movement/mouse tracking
        //Abandon hope, all ye who seek to understand this without outside knowledge
        //Credit for implementation goes to Feedback Control for Computer Systems
        //By Philipp K. Janert, part of the O'Reilly books
        this.kp = 60; //amount to change position based on difference between mouse pos and player pos
        this.ki = 0.0005; //Amount to change position based on previous error
        this.kd = 7000; //Supposedly predicts future movement, but that's not the effect I've noticed
        
        this.i = 0; //tracks cumulative error
        this.prior = 0; //Tracks previous error
        this.shieldValue = false;
        this.moveDimensions = multiDMove;
        if(multiDMove){
            this.xi = 0; //tracks cumulative error
            this.xprior = 0; //Tracks previous error
        }

        //Add the (invisible when inactive) shield
        this.shieldBody = scene.add.circle(this.x, this.y, 16).setStrokeStyle(2, 0x0000FF);
        this.shieldBody.setAlpha(0);
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
        if(this.moveDimensions){
            //Need to know the error/difference a lot, so just define it
            let differencex = mouseX - this.x;
            //Add to the cumulative error the new change
            this.xi += differencex * dT;
            //Define the difference between previous and current error
            let dx = (differencex - this.xprior)/dT;
            this.xprior = differencex;

            this.setAccelerationX(this.kp * differencex + this.ki * this.i + dx * this.kd);
        }

        //If we have a shield, and it's not visible, make it visible
        if(this.shieldValue && this.shieldBody.alpha == 0)
            this.shieldBody.setAlpha(1);
        //If we no longer have a shield but the body is still showing, make it invisible
        if(!this.shieldValue && this.shieldBody.alpha == 1)
            this.shieldBody.setAlpha(0);

        //Then make the shield follow the player regardless
        this.shieldBody.x = this.x;
        this.shieldBody.y = this.y;
    }
}