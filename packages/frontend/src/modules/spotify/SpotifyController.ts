import {Devices, PlaybackState, SpotifyApi} from "@spotify/web-api-ts-sdk";
import EventEmitter from "eventemitter3";
import {clientId} from "./ClientId";
import {ifDefined} from "../../utils/ifDefined";
import {isDeviceSupportsVolume} from "./utils/IsDeviceSupportsVolume";
import {generateRandomString} from "../../utils/generateRandomString";
import {AccessToken} from "@spotify/web-api-ts-sdk/src/types";


export class SpotifyController extends EventEmitter {

    sessionId: string = generateRandomString(32);
    api: SpotifyApi | null = null;
    playbackState: PlaybackState | null = null;
    devices: Devices | null = null;


    constructor() {
        super();
        this.init();
    }

    private get token(): AccessToken | null {
        return JSON.parse(localStorage.getItem("refresh_token") ?? "null");
    }

    private set token(value: AccessToken | null) {
        if (value) {
            localStorage.setItem("refresh_token", JSON.stringify(value))
        } else {
            localStorage.removeItem("refresh_token")
        }
    }

    async init() {
        const hashParams = new URLSearchParams(window.location.search);
        const code = hashParams.get("code");
        if (code) {
            const api = SpotifyApi.withUserAuthorization(clientId, this.getRedirectUri(), this.getScopes());
            try {
                const response = await api.authenticate();
                if (response.authenticated) {
                    this.token = await this.refreshToken(response.accessToken);
                }
            } catch (error) {
                console.log("Nieudany odzysk");
                console.log(error);
                api.logOut();
                this.token = null;
            }
        }
        if (this.token) {
            try {
                console.log("Restore z pamięci");
                this.token = await this.refreshToken(this.token);
                console.log("Udany restore z pamięci");
            } catch (error) {
                console.log("Nieudany restore z pamięci");
                console.log(error);
                this.token = null;
            }
        }

        while (!this.token) {
            const result = await fetch(`https://teampretzels.com/spotify-redirect/backend.php?sessionId=${this.sessionId}`, {method: "GET"});
            const response = await result.json() as AccessToken;
            if (response) {
                try {
                    this.token = await this.refreshToken(response);
                    console.log("Udany restore z serwera ");
                } catch (error) {
                    console.log("Nieudany restore z serwera");
                    console.log(error);
                    this.token = null;
                    this.sessionId = generateRandomString(32);
                    this.emit("update");
                }
            }
            if (!this.token) {
                console.log("Oczekiwanie na restore z serwera");
                await new Promise(resolve => setTimeout(resolve, 1000));
            }
        }

        this.api = SpotifyApi.withAccessToken(clientId, this.token);
        setInterval(async () => {
            this.api = null;
            this.token = await this.refreshToken(this.token!);
            this.api = SpotifyApi.withAccessToken(clientId, this.token!);
        }, 30 * 60 * 1000) //Every half hour
        setInterval(() => this.update(), 5000);
        this.update();
    }

    private async refreshToken(token: AccessToken) {
        const refreshToken = token.refresh_token;
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
            throw response.error;
        }
        return response;
    }

    async update() {
        ifDefined(this.api, async api => {
            try {
                this.playbackState = await api.player.getPlaybackState("PL") ?? null;
                this.emit("update");
                this.devices = await api.player.getAvailableDevices() ?? null;
                this.emit("update");
            } catch (error) {
                console.log("UPDATE Error");
                console.error(error);
                this.api = null;
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


    async tryAuth() {

        const api = SpotifyApi.withUserAuthorization(clientId, this.getRedirectUri(), this.getScopes());
        try {
            const response = await api.authenticate();
            if (response.authenticated) {
                this.token = await this.refreshToken(response.accessToken);
            }
        } catch (error) {
            console.log("Nieudany odzysk");
            console.log(error);
            api.logOut();
            this.token = null;
            this.tryAuth();
        }
    }

    private getScopes() {
        return [
            'user-read-private',
            'user-read-email',
            'user-read-playback-state',
            'user-read-currently-playing',
            'user-modify-playback-state'
        ];
    }

    private getRedirectUri() {
        return location.href.split("?")[0].replace("localhost", "127.0.0.1");
    }
}

