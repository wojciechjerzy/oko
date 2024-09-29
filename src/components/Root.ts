import {css, html, LitElement, TemplateResult} from 'lit'
import {customElement, state} from 'lit/decorators.js'
import {provide} from "@lit/context";
import {Controllers, controllersContext, devicesContext, spotifyContext} from "../SpotifyContext";
import {SpotifyPage} from "./SpotifyPage";
import {NavigationBar} from "./NavigationBar";
import {Device, PlaybackState} from "../SpotifyController";

SpotifyPage;
NavigationBar;

declare global {
  interface HTMLElementTagNameMap {
    "root-component": Root;
  }
}

function when(condition: boolean, callback: () => TemplateResult) {
  if (condition) return callback();
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
  spotifyContext: PlaybackState | null = null;

  @provide({context: devicesContext})
  devices: Device[] = [];

  @provide({context: controllersContext})
  controllers: Controllers;

  @state()
  page: string = "spotify"

  render() {
    return html`
        ${when(this.page === "spotify", () => html`
            <spotify-page></spotify-page>`)}
        ${when(this.page === "eye", () => html`
            <cam-page></cam-page>`)}
        <navigation-bar .buttons=${[
            {
                name: "Spotify",
                onClick: () => this.page = "spotify"
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
