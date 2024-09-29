import {createContext} from "@lit/context";
import {Device, PlaybackState, SpotifyController} from "./SpotifyController";

export const devicesContext = createContext<Device[]>(Symbol('devices'));
export const spotifyContext = createContext<PlaybackState | null>(Symbol('spotifyContext'));
export type Controllers = {
  spotifyController: SpotifyController
};
export const controllersContext = createContext<Controllers | undefined>(Symbol('controllersContext'));
