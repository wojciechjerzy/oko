import {redirectToSpotify} from "./redirectToSpotify";
import {exchangeToken} from "./exchangeToken";
import {generateRandomString} from "./generateRandomString";
import {saveToken} from "./saveToken";

const redirectUri = location.href.split("?")[0];
const code = new URLSearchParams(location.search).get('code')!;
const clientId = new URLSearchParams(location.search).get('clientId')!;
const sessionId = new URLSearchParams(location.search).get('sessionId')!;

if (code) {
    const clientId = localStorage.getItem("clientId")!;
    const codeVerifier = localStorage.getItem("codeVerifier")!;
    const sessionId = localStorage.getItem("sessionId")!;
    exchangeToken(clientId, codeVerifier, redirectUri, code).then(token => saveToken(sessionId, token));
} else if (sessionId && clientId) {
    const codeVerifier = generateRandomString(64);
    localStorage.setItem("clientId", clientId);
    localStorage.setItem("codeVerifier", codeVerifier);
    localStorage.setItem("sessionId", sessionId);
    redirectToSpotify(clientId, redirectUri, codeVerifier);
}


