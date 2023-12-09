import Phaser from "phaser";

export const GAME_EVENT_EMMITER = new Phaser.Events.EventEmitter();

export enum GameEvents {
    OnResizing = 'onresizing',
    OnResized = 'onresized',
    OnFullScreen = 'onfullscreen',
    OnStopFullScreen = 'onstopfullscreen'
}

export class PhaserGameScene extends Phaser.Scene {
 
    setScreenSize(width: number, height: number) {

        GAME_EVENT_EMMITER.emit(GameEvents.OnResizing);

        //set screen resolution
        this.game.canvas.width = width;
        this.game.canvas.height = height;

        console.info(`resizing to ${width}x${height}`);

        this.game.renderer.resize(width, height);
        this.cameras.main.setSize(width, height);
        this.cameras.main.setViewport(0, 0, width, height);

        this.scale.resize(width, height);
        this.scale.refresh();

        GAME_EVENT_EMMITER.emit(GameEvents.OnResized);
    }

    toggleFullscreen = () => {

        if(!this.scale.isFullscreen) {

            this.scale.startFullscreen();
            GAME_EVENT_EMMITER.emit(GameEvents.OnFullScreen);
        }
        else {
            this.scale.stopFullscreen();
            GAME_EVENT_EMMITER.emit(GameEvents.OnStopFullScreen);
        }
    }

    onScreenResizing(cb: () => void) {
        GAME_EVENT_EMMITER.on(GameEvents.OnResizing, cb)
    }

    onScreenResized(cb: () => void) {
        GAME_EVENT_EMMITER.on(GameEvents.OnResized, cb)
    }

    onFullscreen(cb: () => void) {
        GAME_EVENT_EMMITER.on(GameEvents.OnFullScreen, cb)
    }

    onStopFullscreen(cb: () => void) {
        GAME_EVENT_EMMITER.on(GameEvents.OnStopFullScreen, cb)
    }
}