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

export type Device = {
  "id": string,
  "is_active": boolean,
  "is_private_session": boolean,
  "is_restricted": boolean,
  "name": string,
  "type": "Computer" | "Smartphone" | "Speaker",
  "volume_percent": number,
  "supports_volume": boolean
}
export type PlaybackState = {
  device: Device
  "repeat_state": "off" | "track" | "context",
  "shuffle_state": boolean,
  "context": any, //TODO
  "timestamp": number,
  "progress_ms": number,
  "is_playing": boolean,
  "item": TrackObject | null,
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
    this.autorizationPromise.then(() => setInterval(() => this.update(), 5000));
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

  async update(): Promise<any> {

    let token = await this.autorizationPromise;
    let spotifyContext = await this.getPlaybackState({market: "PL"});
    if (spotifyContext === null) {
      this.root.spotifyContext = null

    } else if (Object.hasOwn(spotifyContext, "error")) {

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
        return await this.update();
      } else {
        return this.authorize();
      }
    } else {
      this.root.spotifyContext = spotifyContext as PlaybackState
    }
  }

  getPlayingSong() {
    return this.request("/me/player/currently-playing", "GET", null, true)
  }

  getPlaybackState(body: { market: string }) {
    return this.get<PlaybackState>("/me/player", body);
  }

  async request(path: string, method: "GET" | "POST", body: any, waitForRespinse: boolean) {
    let token = await this.autorizationPromise;
    let response = await fetch("https://api.spotify.com/v1" + path, {
      method,
      headers: {
        "Authorization": token.token_type + "  " + token.access_token
      },
      body
    });

    let text = await response.text();
    if (waitForRespinse) {
      if (text) {
        return JSON.parse(text);
      }
    } else {
      if (text) {
        console.warn("Unhandled response:", text)
      }
    }
    return undefined;
  }

  async get<RETURN_TYPE>(path: string, body: Record<string, any>): Promise<RETURN_TYPE | { error: string } | null> {
    let token = await this.autorizationPromise;
    let url = "https://api.spotify.com/v1" + path + "?" + Object.keys(body).map(key => key + "=" + body[key]).join(",");
    let response = await fetch(url, {
      method: "GET",
      headers: {
        "Authorization": token.token_type + "  " + token.access_token
      }
    });

    let text = await response.text();
    if (text) {
      return JSON.parse(text);
    }
    return null;
  }

  async put(path: string, body: any, waitForRespinse = true) {
    let token = await this.autorizationPromise;
    let response = await fetch("https://api.spotify.com/v1" + path + "?" + Object.keys(body).map(key => key + "=" + body[key]).join("&"), {
      method: "PUT",
      headers: {
        "Authorization": token.token_type + "  " + token.access_token
      }
    });

    let text = await response.text();
    if (waitForRespinse) {
      if (text) {
        return JSON.parse(text);
      }
    } else {
      if (text) {
        console.warn("Unhandled response:", text)
      }
    }
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

  async next() {
    await this.request("/me/player/next", "POST", null, false)
    await this.update();
  }

  async previous() {
    await this.request("/me/player/previous", "POST", null, false)
    await this.update();
  }

  async pause() {
    await this.request("/me/player/pause", "POST", null, false)
    await this.update();
  }

  async volume(body: { volume_percent: number }) {
    await this.put("/me/player/volume", body, false)
    await this.update();
  }
}

