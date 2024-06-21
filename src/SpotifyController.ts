import {Root} from "./components";

let clientId = "5e84c038c03c4d36ae8a807842a0f245";
const redirectUri = location.href.split("?")[0];
const scopes = ['user-read-private', 'user-read-email', 'user-read-playback-state', 'user-read-currently-playing', 'user-modify-playback-state'];

export type ImageObject = {
    url: string,
    width: number;
    height: number;
}

export type TrackObject = {
    type: "track"
    album: {
        images: ImageObject[]
    }
}

export type CurrentlyPlaying = {
    item: TrackObject | null
}

export type AuthorizationInfo = {
    access_token: string
    token_type: string
    scope: string
    expires_in: number
    refresh_token: string
    error: string
}

export class SpotifyController {
    private autorizationPromise: Promise<AuthorizationInfo>;

    constructor(readonly root: Root) {

        this.autorizationPromise = new Promise<AuthorizationInfo>(async resolve => {
            let authorizationInfo: AuthorizationInfo = JSON.parse(localStorage.getItem("spotikkka") ?? "null");
            if (authorizationInfo) {
                for (let scope of scopes) {
                    if (!authorizationInfo.scope.includes(scope)) {
                        this.authorize();
                        return;
                    }
                }
                /*
                let token = await this.autorizationPromise;
                const response = await fetch('https://api.spotify.com/v1/me', {
                    headers: {
                        Authorization: 'Bearer ' + token.access_token
                    }
                });

                const data = await response.json();
*/
                resolve(authorizationInfo);
            } else {
                const urlParams = new URLSearchParams(window.location.search);
                let code = urlParams.get('code');
                if (!code) {
                    this.authorize()
                } else {
                    let authInfo = await this.fetchToken(code);
                    if (authInfo.error) {
                        this.authorize();
                    } else {
                        localStorage.setItem("spotikkka", JSON.stringify(authInfo));
                        resolve(authInfo);
                    }
                }
            }
        })
        this.autorizationPromise.then(() => this.update());
    }

    async fetchToken(code: string): Promise<AuthorizationInfo> {


        // stored in the previous step
        let codeVerifier = localStorage.getItem('code_verifier');

        const payload = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams(<any>{
                client_id: clientId,
                grant_type: 'authorization_code',
                code,
                redirect_uri: redirectUri,
                code_verifier: codeVerifier,
            }),
        }

        const body = await fetch("https://accounts.spotify.com/api/token", payload);
        return await body.json();
    }

    async update() {

        let token = await this.autorizationPromise;
        let spotifyContext = await this.getPlayingSong();
        if (spotifyContext.error) {

            if (token.refresh_token) {
                const payload = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body: new URLSearchParams({
                        grant_type: 'refresh_token',
                        refresh_token: token.refresh_token,
                        client_id: clientId
                    }),
                }
                const body = await fetch("https://accounts.spotify.com/api/token", payload);
                token = await body.json();
                this.autorizationPromise = new Promise(resolve => resolve(token));
            } else {
                return this.authorize();
            }
        }
        this.root.spotifyContext = spotifyContext

        setTimeout(() => this.update(), 5000);
    }

    getPlayingSong() {
        return this.request("/me/player/currently-playing", "GET")
    }

    async request(path: string, method: "GET" | "POST") {
        let token = await this.autorizationPromise;
        let response = await fetch("https://api.spotify.com/v1" + path, {
            method,
            headers: {
                "Authorization": token.token_type + "  " + token.access_token
            }
        });
        let text = await response.text();
        if (text) return JSON.parse(text);
        return undefined;
    }


    async authorize() {
        localStorage.removeItem("spotikkka")
        const generateRandomString = (length: number) => {
            const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            const values = crypto.getRandomValues(new Uint8Array(length));
            return values.reduce((acc, x) => acc + possible[x % possible.length], "");
        }

        const codeVerifier = generateRandomString(64);
        const sha256 = async (plain: string) => {
            const encoder = new TextEncoder()
            const data = encoder.encode(plain)
            return window.crypto.subtle.digest('SHA-256', data)
        }
        const base64encode = (input: ArrayBuffer) => {
            return btoa(String.fromCharCode(...new Uint8Array(input)))
                .replace(/=/g, '')
                .replace(/\+/g, '-')
                .replace(/\//g, '_');
        }
        const hashed = await sha256(codeVerifier)
        const codeChallenge = base64encode(hashed);

        const authUrl = new URL("https://accounts.spotify.com/authorize")

// generated in the previous step
        window.localStorage.setItem('code_verifier', codeVerifier);

        const params = {
            response_type: 'code',
            client_id: clientId,
            scope: scopes.join(" "),
            code_challenge_method: 'S256',
            code_challenge: codeChallenge,
            redirect_uri: redirectUri,
        }

        authUrl.search = new URLSearchParams(params).toString();
        window.location.href = authUrl.toString();
    }

    next() {
        this.request("/me/player/next", "POST")
    }
}

