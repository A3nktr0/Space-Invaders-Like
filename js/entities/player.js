import { Bullet } from './bullet.js';
export class Player{
    constructor(context, x, y){
        this.context = context;
        this.image = new Image();
        this.image.src = "../assets/img/player.png";
        this.x = x
        this.y = y
        this.canvasWidth = this.context.canvas.width;
        this.bullets = [];
        this.movingLeft = false;
        this.movingRight = false;

    }

    draw(){
        this.x = Math.max(0, Math.min(this.x, this.canvasWidth - this.image.width));
        this.context.drawImage(this.image, this.x, this.y);
    }

    moveLeft() {
        if (!this.movingLeft){
            this.movingLeft = true
            this.moveLeftFrame();
        }
    }

    moveLeftFrame() {
        if (this.movingLeft){
            this.x -= 1;
            requestAnimationFrame(this.moveLeftFrame.bind(this));
        }
    }

    moveRight() {
        if (!this.movingRight){
            this.movingRight = true
            this.moveRightFrame();
        }
    }

    moveRightFrame() {
        if (this.movingRight){
            this.x += 1;
            requestAnimationFrame(this.moveRightFrame.bind(this));
        }
    }

    shoot() {
        // console.log('pew pew');
        const bullet = new Bullet(this.context, this.x + this.image.width/2, this.y, true);
        this.bullets.push(bullet);
    }

    update(){
        this.draw();
        this.bullets.forEach(bullet => {
            bullet.update();
        });
    }
}