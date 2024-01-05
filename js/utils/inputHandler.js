import { debounce } from "./utils.js";

export class InputHandler {
    constructor(game, player) {
        this.player = player;
        this.game = game;
        this.debounceShoot = debounce(this.player.shoot.bind(this.player), 100);
        document.addEventListener('keydown', this.handleKeyDown.bind(this));
        document.addEventListener('keyup', this.handleKeyUp.bind(this));
    }

    handleKeyDown(event) {
        if (event.key === "Enter" && !this.game.isLaunch) {
            this.game.soundManager.playSound("coin");
            this.game.isLaunch = true;
            this.game.start();
        }
        if (this.game.isLaunch) {
            switch (event.key.toLowerCase()) {
                case 'arrowleft':
                    this.player.moveLeft();
                    break;
                case 'arrowright':
                    this.player.moveRight();
                    break;
                case ' ':
                    this.game.soundManager.playSound("shoot");
                    this.debounceShoot();
                    break;
                case 'p':
                    this.game.pause();
                    break;
                case 'r':
                    this.game.resume();
                    break;
                case 'escape':
                    this.game.restart();
                    break;
                case 'm':
                    if (this.game.soundManager.sounds.get("theme").paused)
                        this.game.soundManager.playSound("theme");
                    else
                        this.game.soundManager.stopSound("theme");
                    break;
                default:
                    break;
            }
        }
    }

    handleKeyUp(event) {
        switch (event.key.toLowerCase()) {
            case 'arrowleft':
                this.player.movingLeft = false;
                break;
            case 'arrowright':
                this.player.movingRight = false;
                break;
            default:
                break;
        }
    }
}