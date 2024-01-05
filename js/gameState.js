import { Player } from "./entities/player.js";
import { EnemiesMap } from "./entities/enemy.js";
import { checkCollisions } from "./utils/collisionDetector.js";
import { generateEnemiesMap } from "./utils/utils.js";

export class GameState {
    constructor(game, context, renderer) {
        this.game = game;
        this.context = context;
        this.renderer = renderer;

        this.enemiesMap = generateEnemiesMap(5, 10);
        this.checkCollisions = checkCollisions;
        this.enemies = new EnemiesMap(this.context);
        this.currentTime = 0;

        this.initPlayerX = this.context.canvas.width / 2 - 25;
        this.initPlayerY = this.context.canvas.height - 60;
        this.player = new Player(this.context, this.initPlayerX, this.initPlayerY);

        this.lives = 3;
        this.score = 0;
        this.level = 1;
        this.clock = 0;
    }

    initialize() {
        this.enemiesMap.forEach((row, rowIndex) => {
            row.forEach((enemyType, columnIndex) => {
                this.enemies.addEnemy(50 + columnIndex * 50, 50 + rowIndex * 50, enemyType);
            });
        })
        this.renderer.drawGame(this.player, this.enemies.enemies);
    }

    update() {
        this.clock += 1 / 60;
        const minutes = Math.floor(this.clock / 60);
        const seconds = Math.floor(this.clock % 60);
        document.getElementById("clock").innerHTML = `${minutes}:${seconds < 10 ? '0' : ''}${seconds.toFixed(0)}`;
        if (this.enemies.enemies.length === 0) {
            this.level++;
            this.enemies.upgrade(this.level);
            this.enemiesMap = generateEnemiesMap(5, 10);
            this.enemiesMap.forEach((row, rowIndex) => {
                row.forEach((enemyType, columnIndex) => {
                    this.enemies.addEnemy(50 + columnIndex * 50, 50 + rowIndex * 50, enemyType);
                });
            })
        }
        this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
        this.enemies.move();
        this.player.update();
        this.enemies.update(this.game.soundManager);
        this.checkCollisions(this.game, this, this.player, this.enemies, this.player.bullets);
        if (this.enemies.reachBottom()) {
            this.game.stop();
        }
        this.displayScore();
        this.displayLevel();
        this.displayLives();
        this.renderer.drawGame(this.player, this.enemies.enemies, this.player.bullets);
    }

    displayLevel() {
        this.context.font = "20px Arial";
        this.context.fillStyle = "white";
        this.context.textAlign = "left";
        this.context.fillText(`Level: ${this.level}`, 10, 30);
    }

    displayLives() {
        this.context.font = "20px Arial";
        this.context.fillStyle = "white";
        this.context.textAlign = "right";
        this.context.fillText(`Lives: ${this.lives}`, this.context.canvas.width - 10, 30);
    }

    displayScore() {
        this.context.font = "20px Arial";
        this.context.fillStyle = "white";
        this.context.textAlign = "center";
        this.context.fillText(`Score: ${this.score}`, this.context.canvas.width / 2, 30);
    }
}