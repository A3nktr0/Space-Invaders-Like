export class Bullet {
    constructor(context, x, y, isPlayer) {
        this.context = context;
        this.x = x;
        this.y = y;
        this.width =  this.height = 5;
        this.isPlayer = isPlayer;

    }

    draw() {
        if (this.isPlayer){
            this.context.fillStyle = "yellow";
        } else {
            this.context.fillStyle = "red";
            this.height = 15;
        }
        this.context.fillRect(this.x, this.y, this.width, this.height);
    }

    move() {
        if (this.isPlayer){
            this.y -= 10;
        } else {
            this.y += 10;
        }
    }

    update(){
        this.move();
        this.draw();
    }
}