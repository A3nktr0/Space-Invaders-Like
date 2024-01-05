export class Renderer {
    constructor() {
        const CANVAS_SIZE = 600

        this.canvas = document.getElementById("game");
        this._context = this.canvas.getContext("2d");
        this.canvas.width = this.canvas.height = CANVAS_SIZE;
    }

    get context() {
        return this._context;
    }

    drawGame(player, enemies) {
        this.drawPlayer(player);
        this.drawEnemiesMap(enemies);
        this.drawBullets(player.bullets);
        this.drawBullets(enemies.flatMap(enemy => enemy.bullets));
    }

    drawPlayer(player) {
        player.draw();
    }

    drawBullets(bullets) {
        bullets.forEach(bullet => {
            bullet.draw();
        });
    }

    drawEnemiesMap(enemiesMap) {
        enemiesMap.forEach(enemy => {
            enemy.draw();
        });
    }
}