import {createContext} from "@lit-labs/context";
import {SpotifyController} from "./modules/spotify/SpotifyController";
import {ClockController} from "./modules/clock/ClockController";
import {BrightnessController} from "./modules/brightness/BrightnessController";

export type ApplicationContext = {
    spotifyController: SpotifyController
    clockController: ClockController
    brightnessController: BrightnessController
};
export const applicationContext = createContext<ApplicationContext | undefined>(Symbol('context'));
