import Phaser from "phaser";

export const GAME_EVENT_EMMITER = new Phaser.Events.EventEmitter();

export enum GameEvents {
    OnResizing = 'onresizing',
    OnResized = 'onresized',
    OnFullScreen = 'onfullscreen',
    OnStopFullScreen = 'onstopfullscreen'
}

export class GameScene extends Phaser.Scene
{
    private DEFAULT_MAX_HEIGHT = 600;
    private DEFAULT_MAX_WIDTH = 800;

    get isMobile() {
        return 'contacts' in navigator;
    }

    get gameWidth() {
        return Math.min(window.innerWidth, this.DEFAULT_MAX_WIDTH);
    }

    get gameHeight() {
        return Math.min(window.innerHeight, this.DEFAULT_MAX_HEIGHT);;
    }

    create() {

        window.onresize = () => {

            console.log(`onresize [${window.innerWidth}, ${window.innerHeight}]`);
            this.scale.resize(this.gameWidth, this.gameHeight);
            this.resizeGameToDevice();
        }

        //configure hooks resizing when device changes.
        this.scale.on('resize', () => {

            console.log(`resize [${window.innerWidth}, ${window.innerHeight}]`)
            this.resizeGameToDevice();
        }, this);

        this.events.on(Phaser.Scenes.Events.SHUTDOWN, () => {

            console.log("scene is shutting down")
            GAME_EVENT_EMMITER.removeAllListeners();
            this.scale.off('resize')
        });

        this.scale.resize(this.gameWidth, this.gameHeight);
    }

    resizeGameToDevice() {

        GAME_EVENT_EMMITER.emit(GameEvents.OnResizing);

        //fill device window if on mobile, or full screen
        const mediaQuery = window.matchMedia("(max-width: 768px)");  
        const fullDeviceSize = this.scale.isFullscreen || mediaQuery.matches;

        let width = this.gameWidth;
        let height = this.gameHeight;

        //set screen resolution
        this.game.canvas.width = width;
        this.game.canvas.height = height;

        console.log(`resizing to ${width}x${height}`);
        this.game.renderer.resize(width, height);
        this.cameras.main.setSize(width, height);
        this.cameras.main.setViewport(0, 0, width, height);

        setTimeout(() => {
            GAME_EVENT_EMMITER.emit(GameEvents.OnResized);
        }, 10)
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