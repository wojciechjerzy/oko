import {createContext} from "@lit-labs/context";
import {SpotifyController} from "./SpotifyController.js";

export type Controllers = {
    spotifyController: SpotifyController
};
export const controllersContext = createContext<Controllers | undefined>(Symbol('controllersContext'));
