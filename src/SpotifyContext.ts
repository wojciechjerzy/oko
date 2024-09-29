import {createContext} from "@lit/context";
import {PlaybackState, SpotifyController} from "./SpotifyController";

export const spotifyContext = createContext<PlaybackState | null>(Symbol('spotifyContext'));
export type Controllers = {
  spotifyController: SpotifyController
};
export const controllersContext = createContext<Controllers | undefined>(Symbol('controllersContext'));
