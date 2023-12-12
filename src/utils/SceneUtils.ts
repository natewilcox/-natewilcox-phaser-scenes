import { Scene } from "../scenes/Scene";

export function resizeToScreen(scene: Scene, addListener?: boolean, maxWidth? : number, maxHeight? : number) {

    const resize = () => {
        scene.setScreenSize(Math.min(maxWidth, document.documentElement.clientWidth), Math.min(maxHeight, document.documentElement.clientHeight));
    }

    if(addListener) {
        window.addEventListener('resize', resize);
    }

    //if the screen size is different than the scale size, resize
    if(window.innerWidth != scene.scale.width || window.innerWidth != scene.scale.height) {
        resize();
    }
}