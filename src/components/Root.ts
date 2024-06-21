import {css, html, LitElement} from 'lit'
import {customElement} from 'lit/decorators.js'
import {provide} from "@lit/context";
import {Controllers, controllersContext, spotifyContext} from "../SpotifyContext";
import {SpotifyPage} from "./SpotifyPage";
import {NavigationBar} from "./NavigationBar";
import {CurrentlyPlaying} from "../SpotifyController";

SpotifyPage;
NavigationBar;

declare global {
    interface HTMLElementTagNameMap {
        "root-component": Root;
    }
}

@customElement('root-component')
export class Root extends LitElement {
    static styles = css`
        :host {
            width: 1080px;
            height: 1080px;
            position: absolute;
            left: calc(50% - 540px);
            top: calc(50% - 540px);
            scale: calc(var(--size) / 1080);
        }
    `;

    @provide({context: spotifyContext})
    spotifyContext: CurrentlyPlaying;

    @provide({context: controllersContext})
    controllers: Controllers;

    render() {
        return html`ABC
        <spotify-page></spotify-page>
        <navigation-bar .buttons=${[
            {
                name: "Spotify",
                onClick: () => console.log("XXX")
            },
            {
                name: "Refresh",
                onClick: () => location.href = location.href.split("?")[0] + "?" + Date.now()
            },
            {
                name: "" + window.innerWidth + "x" + window.innerHeight,
                onClick: () => location.reload()
            },
        ]}></navigation-bar>
        `;
    }
}
