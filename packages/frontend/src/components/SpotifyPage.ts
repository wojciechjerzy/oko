import {css, html, LitElement} from 'lit';
import {customElement, state} from 'lit/decorators.js';
import {consume} from "@lit-labs/context";
import {type Controllers, controllersContext} from "../SpotifyContext.js";
import {ifNotNull} from "../utils/ifDefined.js";
import QRCode from "qrcode";
import {Track} from "@spotify/web-api-ts-sdk";

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

        .deviceSelect {
            position: absolute;
            width: 400px;
            height: 40px;
            left: calc(50% - 200px);
            bottom: 120px;
        }

        .volume {
            position: absolute;
            width: 200px;
            height: 40px;
            left: calc(50% - 100px);
            bottom: 280px;
        }

        .qr {
            position: absolute;
            left: calc(50% - 200px);
            top: calc(50% - 200px);
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

            &.isPlaying {
                animation-play-state: running;
            }

            &.isNotPlaying {
                animation-play-state: paused;
            }
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

            &.isPlaying {
                animation-play-state: running;
            }

            &.isNotPlaying {
                animation-play-state: paused;
            }
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
            bottom: 180px;
            justify-content: center;

        }

        .next {
            font-size: 24px;
            color: white;
            cursor: pointer;
            display: flex;
            width: 60px;
            height: 60px;
            border: solid 2px white;
            background-color: rgba(255, 255, 255, 10%);
            border-radius: 50px;
            margin: 10px;
            align-items: center;
            justify-content: center;
        }
    `;

    @consume({context: controllersContext, subscribe: true})
    accessor controllers!: Controllers;

    @state()
    accessor qrUrl: string | null = null;

    connectedCallback() {
        super.connectedCallback();
        this.controllers.spotifyController.addListener("update", () => {
            this.requestUpdate();
            QRCode.toDataURL(this.controllers.spotifyController.getUrl()).then(url => this.qrUrl = url);
        });
    }

    render() {
        let spotifyController = this.controllers.spotifyController;
        if (!spotifyController.token) {
            return this.generateQrCode();
        }

        var devices = spotifyController.devices;
        let activeDeviceId = devices?.devices.find(d => d.is_active)?.id;
        console.log(activeDeviceId);
        return html`

            ${ifNotNull(spotifyController.playbackState, playbackState => {
                if (playbackState.item?.type === "track") {
                    let trackItem = playbackState.item as Track;
                    console.log(trackItem);
                    return html`
                        <div class="background">
                            <div class="vinyl ${playbackState.is_playing ? "isPlaying" : "isNotPlaying"}"></div>
                            <div class="mask"></div>
                            <div class="vinylContent ${playbackState.is_playing ? "isPlaying" : "isNotPlaying"}"
                                 style="background-image: url('${trackItem.album.images[0].url}')"></div>
                            <div class="vinylDot"></div>
                        </div>
                    `

                }
            })}
            <div class="controllers">
                <div class="next" @click=${() => spotifyController.previous()}>◀◀
                </div>
                ${
                        spotifyController.playbackState?.is_playing
                                ? html`
                                    <div class="next" @click=${() => spotifyController.pause()}>❚❚</div>`
                                : html`
                                    <div class="next" @click=${() => spotifyController.pause()}>▶</div>`
                }
                <div class="next" @click=${() => spotifyController.next()}>▶▶</div>
            </div>
            ${this.renderSelect()}
            ${this.renderVolume()}
        `
    }

    private renderVolume() {
        let spotifyController = this.controllers.spotifyController;
        const activeDevice = spotifyController.playbackState?.device;
        if (activeDevice) {
            return html` <input class="volume"
                                type="range"
                                min="0"
                                max="100"
                                @change=${(e: InputEvent) => {
                                    let target = e.target as HTMLInputElement;
                                    return spotifyController.volume(target.valueAsNumber);
                                }}
                                .value=${activeDevice.volume_percent}/>`;
        }
    }

    private renderSelect() {
        const spotifyController = this.controllers.spotifyController;
        const devices = spotifyController.devices;
        const activeDeviceId = devices?.devices?.find(d => d.is_active)?.id;

        return html`
            <select
                    class="deviceSelect"
                    @change=${(e: InputEvent) => {
                        let deviceId = (e.target as HTMLSelectElement).value;
                        if (deviceId) {
                            spotifyController.changeDevice(deviceId);
                        }
                    }}
                    .value=${activeDeviceId}>
                <option></option>
                ${
                        devices?.devices.sort((d1, d2) => d1.name < d2.name ? -1 : 1).map(device => device.is_active
                                ? html`
                                    <option .value=${device.id} selected="selected">${device.name}</option>`
                                : html`
                                    <option .value=${device.id}>${device.name}</option>`
                        )
                }
            </select>`
    }

    private generateQrCode() {
        return html`
            <a
                    target="_blank"
                    class="qr"
                    href=${this.controllers.spotifyController.getUrl()}>
                <img
                        width="400"
                        height="400"
                        src=${this.qrUrl}/>
            </a>`;
    }
}
