import { Bullet } from './bullet.js';
export class Enemy {
    constructor(context, x, y, enemyType) {
        this.context = context;
        this.image = new Image();
        this.image.src = `../assets/img/enemy${enemyType}.png`;
        this.x = x;
        this.y = y;
        this.bullets = [];
        this.lastShot = Date.now()+2000;
        this.coolDown = Math.random() * 15;
        this.shootLimit = 10000
    }

    draw() {
        this.context.drawImage(this.image, this.x, this.y);
    }

    shoot(soundManager) {
        const now = Date.now();
        if (now - this.lastShot >= this.coolDown * this.shootLimit) {
            this.lastShot = now;
            const bullet = new Bullet(this.context, this.x + this.image.width / 2, this.y + this.image.height, false);
            this.bullets.push(bullet);
            soundManager.playSound("enemy-shoot");
            this.coolDown = Math.random() * 15
        }
    }

    update() {
        this.bullets.forEach(bullet => {
            bullet.update();
        });
    }
}


export class EnemiesMap {
    constructor(context) {
        this.context = context;
        this.enemies = [];
        this.reverse = false;
        this.enemiesBullets = [];
        this.velocity = 1;
        this.fall = 10;
    }

    addEnemy(x, y, type) {
        const enemy = new Enemy(this.context, x, y, type);
        this.enemies.push(enemy);
    }

    draw() {
        this.enemies.forEach(enemy => {
            enemy.draw();
        });
    }

    move() {
        const atRightEdge = this.enemies.some(enemy => enemy.x + enemy.image.width >= this.context.canvas.width);
        const atLeftEdge = this.enemies.some(enemy => enemy.x <= 0);
        if (atRightEdge || atLeftEdge) {
            this.reverse = !this.reverse;
            this.enemies.forEach(enemy => {
                enemy.y += this.fall;
            });
        }
        this.enemies.forEach(enemy => {
            this.reverse ? enemy.x -= this.velocity : enemy.x += this.velocity;
        });
    }

    reachBottom() {
        const atBottomEdge = this.enemies.some(enemy => enemy.y + enemy.image.height >= this.context.canvas.height);
        return atBottomEdge;
    }

    upgrade(level) {
        if (level%5 == 0) {
            this.velocity += 0.2;
            this.fall += 0.5;
            this.enemies.forEach(enemy => {
                enemy.shootLimit -= 1000;
            })
        } else {
            this.velocity += 0.2;
        }
    }

    update(soundManager) {
        this.enemies.forEach(enemy => {
            enemy.shoot(soundManager);
            enemy.update();
        });
    }
}
