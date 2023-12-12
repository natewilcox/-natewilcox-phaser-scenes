import { MenuOptionConfig } from "./MenuOptionConfig";

export type BasicMenuSceneConfig = {
    title: string;
    subTitle: string;
    menuItems: MenuOptionConfig[];
    nextScene?: string;
}