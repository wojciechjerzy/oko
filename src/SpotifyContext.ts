import {createContext} from "@lit/context";
import {CurrentlyPlaying, SpotifyController} from "./SpotifyController";


export const spotifyContext = createContext<CurrentlyPlaying | undefined>(Symbol('spotifyContext'));
export type Controllers = {
    spotifyController: SpotifyController
};
export const controllersContext = createContext<Controllers | undefined>(Symbol('controllersContext'));
