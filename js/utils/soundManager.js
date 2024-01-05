export class SoundManager {
    constructor() {
        this.sounds = new Map();
    }

    loadSound(soundName, soundPath) {
        const sound = new Audio(soundPath);
        if (soundName === "theme") {
            sound.loop = true;
        }
        this.sounds.set(soundName, sound);
    }

    playSound(soundName) {
        const sound = this.sounds.get(soundName);
        if (sound) {
            sound.play();
        }
    }

    stopSound(soundName) {
        const sound = this.sounds.get(soundName);
        if (sound) {
            sound.pause();
            sound.currentTime = 0;
        }
    }
}

