import type {AuthorizationInfo} from "./AuthorizationInfo.js";
import {Devices, PlaybackState, SpotifyApi} from "@spotify/web-api-ts-sdk";
import EventEmitter from "eventemitter3";
import {clientId} from "./ClientId";
import {ifDefined} from "./utils/ifDefined";
import {isDeviceSupportsVolume} from "./IsDeviceSupportsVolume";

export class SpotifyController extends EventEmitter {

    private sessionId: string = "";

    token: AuthorizationInfo | null = null;
    api: SpotifyApi | null = null;
    playbackState: PlaybackState | null = null;
    devices: Devices | null = null;

    constructor() {
        super();
        this.newSession();
        this.refreshToken();
        // @ts-ignore
        window.s = this;
    }

    private newSession() {
        this.sessionId = localStorage.getItem("sessionId") ?? Date.now().toString();
        localStorage.setItem("sessionId", this.sessionId);
        this.update();
    }

    async refreshToken() {
        if (!this.token) {

            var refreshToken = localStorage.getItem("refresh_token");
            if (refreshToken) {
                await this.getRefreshToken();
            }

            if (!this.token) {
                const result = await fetch(`https://teampretzels.com/spotify-redirect/backend.php?sessionId=${this.sessionId}`, {method: "GET"});
                const response = await result.json() as AuthorizationInfo;
                if (response) {
                    this.token = response;
                    await this.getRefreshToken();
                }
            }
        }

        if (this.token && !this.api) {
            this.api = SpotifyApi.withAccessToken(clientId, this.token);
            this.api.player.getPlaybackState().then(playbackState => {
                this.playbackState = playbackState;
                this.emit("update");
                setInterval(() => this.update(), 5000);
            }).catch(() => {
                console.log("Token expired");
                this.newSession();
                return this.api = null;
            });
        }

        if (!this.token) {
            setTimeout(() => this.refreshToken(), 1000);
        }
    }

    async getRefreshToken() {
        if (!this.token) return;
        const refreshToken = localStorage.getItem("refresh_token");
        localStorage.removeItem("refresh_token");
        if (!refreshToken) return;
        const url = "https://accounts.spotify.com/api/token";

        const payload = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
                grant_type: 'refresh_token',
                refresh_token: refreshToken,
                client_id: clientId
            }),
        }
        const body = await fetch(url, payload);
        const response = await body.json();

        if (response.error) {
            this.token = null;
            this.newSession();
        } else {
            this.token = response;
            localStorage.setItem("refresh_token", JSON.stringify(response.refresh_token));
        }
    }


    async update(): Promise<any> {
        ifDefined(this.api, async api => {
            this.playbackState = await api.player.getPlaybackState("PL") ?? null;
            this.emit("update");
            this.devices = await api.player.getAvailableDevices() ?? null;
            this.emit("update");
        })
    }

    async previous() {
        ifDefined(await this.getActiveDeviceId(), async deviceId => {
            await this.api?.player.skipToPrevious(deviceId);
            this.update()
        })
    }

    async next() {
        ifDefined(await this.getActiveDeviceId(), async deviceId => {
            await this.api?.player.skipToNext(deviceId);
            this.update()
        })
    }

    async volume(volume_percent: number) {
        ifDefined(await this.getActiveDevice(), device => {
            if (device.id && isDeviceSupportsVolume(device)) {
                this.api?.player.setPlaybackVolume(volume_percent, device.id)
            }
        })
    }

    async pause() {
        ifDefined(await this.getActiveDeviceId(), async deviceId => {
            let playbackState = this.playbackState;
            if (playbackState?.is_playing) {
                await this.api?.player.pausePlayback(deviceId);
            } else if (deviceId) {
                await this.api?.player.startResumePlayback(deviceId)
            }
        })
    }


    private async getActiveDeviceId() {
        let activeDevice = await this.getActiveDevice();
        let deviceId = activeDevice?.id;
        return deviceId;
    }

    private async getActiveDevice() {
        if (this.playbackState?.device) return this.playbackState.device;
        this.devices = await this.api?.player.getAvailableDevices() ?? null;
        let activeDevice = this.devices?.devices?.find(d => d.is_active);
        return activeDevice;
    }


    async changeDevice(deviceId: string) {
        await this.api?.player.transferPlayback([deviceId]);
        this.update()
    }

    getUrl() {
        let url = "https://teampretzels.com/spotify-redirect/";
        return `${url}?sessionId=${this.sessionId}&clientId=${clientId}`;
    }
}

