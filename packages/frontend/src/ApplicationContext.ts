import {createContext} from "@lit-labs/context";
import {SpotifyController} from "./modules/spotify/SpotifyController";

export type ApplicationContext = {
    spotifyController: SpotifyController
};
export const applicationContext = createContext<ApplicationContext | undefined>(Symbol('context'));
