
import { Renderer } from "./renderer.js";
import { InputHandler } from "./utils/inputHandler.js";
import { GameState } from "./gameState.js";
import { SoundManager } from "./utils/soundManager.js";


export class Game {

    constructor() {
        this.soundManager = new SoundManager();
        this.soundManager.loadSound("coin", "/assets/sounds/coin.wav");
        this.soundManager.loadSound("shoot", "/assets/sounds/sounds_shoot.wav");
        this.soundManager.loadSound("enemy-shoot", "/assets/sounds/sounds_enemy-shoot.wav");
        this.soundManager.loadSound("enemy-death", "/assets/sounds/sounds_enemy-death.wav");
        this.soundManager.loadSound("game-over", "/assets/sounds/arcade-explosion-echo.wav");
        this.soundManager.loadSound("player-hit", "/assets/sounds/arcade-explosion.wav");
        this.soundManager.loadSound("notifier", "/assets/sounds/retro-notification.wav")
        this.soundManager.loadSound("theme", "/assets/sounds/Space_Invaders_Music.ogg");
        this.soundManager.playSound("theme");
        this.lastime = 0;
        this.FRAMERATE = 1000 / 60;
        this.isRunning = true;
        this.renderer = new Renderer();
        this.context = this.renderer.context;
        this.gameState = new GameState(this, this.context, this.renderer);
        this.inputHandler = new InputHandler(this, this.gameState.player);
        this.isLaunch = false;
    }

    launch() {
        if (!this.isLaunch) {
            this.context.font = "30px Arial";
            this.context.fillStyle = "white";
            this.context.textAlign = "center";
            this.context.fillText("Press 'ENTER' to start", this.context.canvas.width / 2, this.context.canvas.height / 2);
        } else {
            this.start();
        }
    }
    start() {
        this.gameState.initialize();
        this.gameLoop();
    }

    gameLoop(timestamp) {
        if (!this.isRunning) return;
        const deltaTime = timestamp - this.lastime;
        if (deltaTime >= this.FRAMERATE) {
            this.lastime = timestamp;
            this.gameState.update();
        }
        requestAnimationFrame((timestamp) => this.gameLoop(timestamp))
    }

    stop() {
        this.soundManager.playSound("game-over");
        this.soundManager.stopSound("theme");
        this.isRunning = false;
        this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
        this.gameState.enemies.enemies = [];
        this.context.font = "50px Arial";
        this.context.fillStyle = "red";
        this.context.textAlign = "center";
        this.context.fillText("Game Over", this.context.canvas.width / 2, this.context.canvas.height / 2);
        this.context.fillStyle = "white";
        this.context.font = "20px Arial";
        this.context.fillText("Press 'Esc' to restart", this.context.canvas.width / 2, this.context.canvas.height / 2 + 50);
    }

    pause() {
        this.soundManager.playSound("notifier");
        this.soundManager.stopSound("theme");
        this.isRunning = false;
        this.context.font = "50px Arial";
        this.context.fillStyle = "white";
        this.context.textAlign = "center";
        this.context.shadowColor = "black";
        this.context.shadowBlur = 2;
        this.context.shadowOffsetX = 2;
        this.context.shadowOffsetY = 2;
        this.context.fillText("Pause", this.context.canvas.width / 2, this.context.canvas.height / 2);
        this.context.font = "20px Arial";
        this.context.fillText("Press 'R' to continue", this.context.canvas.width / 2, this.context.canvas.height / 2 + 50);
        this.context.fillText("Press 'Esc' to restart", this.context.canvas.width / 2, this.context.canvas.height / 2 + 80);
    }

    resume() {
        this.soundManager.playSound("notifier");
        this.soundManager.playSound("theme");
        this.isRunning = true;
        this.gameLoop();
    }

    restart() {
        window.location.reload();
    }
}