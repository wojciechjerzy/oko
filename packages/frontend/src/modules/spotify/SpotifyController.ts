import type {AuthorizationInfo} from "./types/AuthorizationInfo";
import {Devices, PlaybackState, SpotifyApi} from "@spotify/web-api-ts-sdk";
import EventEmitter from "eventemitter3";
import {clientId} from "./ClientId";
import {ifDefined} from "../../utils/ifDefined";
import {isDeviceSupportsVolume} from "./utils/IsDeviceSupportsVolume";

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
        setInterval(() => this.update(), 5000);
    }

    private newSession() {
        this.sessionId = localStorage.getItem("sessionId") ?? Date.now().toString();
        localStorage.setItem("sessionId", this.sessionId);
        this.emit("update");
    }

    async refreshToken() {
        if (!this.token) {
            await this.restoreToken();
        }

        if (!this.token) {
            const result = await fetch(`https://teampretzels.com/spotify-redirect/backend.php?sessionId=${this.sessionId}`, {method: "GET"});
            const response = await result.json() as AuthorizationInfo;
            if (response) {
                this.token = response;
                await this.restoreToken();
            }
        }

        if (this.token && !this.api) {
            this.api = SpotifyApi.withAccessToken(clientId, this.token);
            try {
                await this.getPlaybackState();
            } catch (error) {
                console.error(error);
                this.newSession();
                this.api = null;
            }
        }

        if (!this.token) {
            setTimeout(() => this.refreshToken(), 1000);
        }
    }

    async restoreToken() {
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


    async update() {
        ifDefined(this.api, async api => {
            try {
                this.playbackState = await api.player.getPlaybackState("PL") ?? null;
                this.emit("update");
                this.devices = await api.player.getAvailableDevices() ?? null;
                this.emit("update");
            } catch (error) {
                console.error(error);
                this.api = null;
                this.newSession();
            }
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
        ifDefined(await this.getPlaybackState(), async playbackState => {
            await ifDefined(playbackState.device.id, deviceId => playbackState.is_playing
                ? this.api?.player.pausePlayback(deviceId)
                : this.api?.player.startResumePlayback(deviceId))
            this.update();
        })
    }

    private async getPlaybackState() {
        return ifDefined(this.api, async api => {
            this.playbackState = await api.player.getPlaybackState();
            this.emit("update");
            return this.playbackState;
        })
    }

    private async getActiveDevice() {
        const playbackState = await this.getPlaybackState();
        return playbackState?.device;
    }

    private async getActiveDeviceId() {
        const activeDevice = await this.getActiveDevice();
        return activeDevice?.id;
    }

    async changeDevice(deviceId: string) {
        await this.api?.player.transferPlayback([deviceId]);
        this.update()
    }

    getUrl() {
        const url = "https://teampretzels.com/spotify-redirect/";
        return `${url}?sessionId=${this.sessionId}&clientId=${clientId}`;
    }
}

