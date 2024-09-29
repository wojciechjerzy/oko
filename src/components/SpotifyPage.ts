import {css, html, LitElement} from 'lit';
import {customElement} from 'lit/decorators.js';
import {CurrentlyPlaying} from "../SpotifyController";
import {consume} from "@lit/context";
import {Controllers, controllersContext, spotifyContext} from "../SpotifyContext";
import {ifNotNull} from "../utils/ifDefined";

declare global {
  interface HTMLElementTagNameMap {
    "spotify-page": SpotifyPage;
  }
}

@customElement("spotify-page")
export class SpotifyPage extends LitElement {
  static styles = css`
      :host {
          background-color: black;
          width: 100%;
          position: absolute;
          height: 100%;
          left: 0;
          top: 0;
      }

      .background {
          pointer-events: none;
      }

      @keyframes rotation {
          0% {
              rotate: 0deg;
          }
          33% {
              rotate: 120deg;
          }
          66% {
              rotate: 240deg;
          }
          100% {
              rotate: 360deg;
          }
      }

      .vinyl {
          position: absolute;
          left: 0;
          top: 0;
          background-image: url("assets/record.jpg");
          width: 1080px;
          height: 1080px;
          animation-name: rotation;
          animation-duration: 8s;
          animation-iteration-count: infinite;
          animation-timing-function: linear;
      }

      .mask {
          left: 0;
          top: 0;
          position: absolute;
          background-image: url("assets/record_mask.jpg");
          mix-blend-mode: overlay;
          background-position: center center;
          width: 1080px;
          height: 1080px;
      }

      .vinylContent {
          position: absolute;
          border-radius: 200px;
          background-size: contain;
          width: 400px;
          height: 400px;
          left: calc(50% - 200px);
          top: calc(50% - 200px);
          animation-name: rotation;
          animation-duration: 8s;
          animation-iteration-count: infinite;
          animation-timing-function: linear;
      }

      .vinylDot {
          position: absolute;
          border-radius: 15px;
          background-size: contain;
          width: 30px;
          height: 30px;
          left: calc(50% - 15px);
          top: calc(50% - 15px);
          background-color: black;
      }

      .controllers {
          color: white;
          cursor: pointer;
          position: absolute;
          display: flex;
          width: 100%;
          height: 100px;
          top: 75%;
          justify-content: center;

      }

      .next {
          color: white;
          cursor: pointer;
          display: flex;
          width: 100px;
          height: 100px;
          border: solid 2px white;
          background-color: rgba(255, 255, 255, 10%);
          border-radius: 50px;
          margin: 10px;
          align-items: center;
          justify-content: center;
      }
  `;

  @consume({context: spotifyContext, subscribe: true})
  private spotifyContext: CurrentlyPlaying;

  @consume({context: controllersContext, subscribe: true})
  private controllers?: Controllers;

  render() {
    return html`


        ${ifNotNull(this.spotifyContext, ctx => {
            if (ctx.item?.type === "track") {
                return html`
                    <div class="background">
                        <div class="vinyl"></div>
                        <div class="mask"></div>
                        <div class="vinylContent"
                             style="background-image: url('${ctx.item?.album.images[0].url}')"></div>
                        <div class="vinylDot"></div>
                    </div>
                    <div class="controllers">
                        <div class="next" @click=${() => this.controllers?.spotifyController.previous()}>previous</div>
                        <div class="next" @click=${() => this.controllers?.spotifyController.pause()}>pause</div>
                        <div class="next" @click=${() => this.controllers?.spotifyController.next()}>next</div>
                        <div class="next"
                             @click=${() => this.controllers?.spotifyController.volume({volume_percent: 25})}>25
                        </div>
                    </div>
                `

            }
        })}
    `
  }
}
