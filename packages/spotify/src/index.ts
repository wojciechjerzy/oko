import {generateRandomString} from "./generateRandomString";
import {codeChallenge} from "./codeChallenge";

const redirectUri = location.href.split("?")[0];
const scopes = [
    'user-read-private',
    'user-read-email',
    'user-read-playback-state',
    'user-read-currently-playing',
    'user-modify-playback-state'
];

const code = new URLSearchParams(location.search).get('code')!;
const clientId = new URLSearchParams(location.search).get('clientId')!;
const sessionId = new URLSearchParams(location.search).get('sessionId')!;

if (location.href.includes("localhost")) {
    location.href = location.href.replace("localhost", "127.0.0.1");
} else if (code) {
    let clientId = localStorage.getItem("clientId")!;
    let codeVerifier = localStorage.getItem("codeVerifier")!;
    let sessionId = localStorage.getItem("sessionId")!;
    const res = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: new URLSearchParams({
            grant_type: 'authorization_code',
            client_id: clientId,
            code,
            redirect_uri: redirectUri,
            code_verifier: codeVerifier
        }),
    });
    const token = await res.json();
    fetch(`backend.php?sessionId=${sessionId}`, {
        body: JSON.stringify(token),
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }
    }).then(() => window.close())
} else if (sessionId && clientId) {
    const codeVerifier = generateRandomString(64);
    localStorage.setItem("clientId", clientId);
    localStorage.setItem("codeVerifier", codeVerifier);
    localStorage.setItem("sessionId", sessionId);

    async function redirectToSpotify() {

        const code_challenge = await codeChallenge(codeVerifier);
        const authUrl = new URL("https://accounts.spotify.com/authorize")

        let params: {
            response_type: string;
            client_id: string;
            scope: string;
            code_challenge_method: string;
            code_challenge: string;
            redirect_uri: string
        };
        params = {
            response_type: 'code',
            client_id: clientId,
            scope: scopes.join(" "),
            code_challenge_method: 'S256',
            code_challenge: code_challenge,
            redirect_uri: redirectUri,
        };

        authUrl.search = new URLSearchParams(params).toString();
        window.location.href = authUrl.toString();
    }

    redirectToSpotify();
}


