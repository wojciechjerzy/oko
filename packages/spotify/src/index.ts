import {SpotifyApi} from "@spotify/web-api-ts-sdk";

const redirectUri = location.href.split("?")[0];
const code = new URLSearchParams(location.search).get('code')!;
const clientId = new URLSearchParams(location.search).get('clientId')!;
const sessionId = new URLSearchParams(location.search).get('sessionId')!;
const scopes = [
    'user-read-private',
    'user-read-email',
    'user-read-playback-state',
    'user-read-currently-playing',
    'user-modify-playback-state'
];

if (code) {
    const sessionId = localStorage.getItem("sessionId")!;
    const clientId = localStorage.getItem("clientId")!;
    const api = SpotifyApi.withUserAuthorization(clientId, redirectUri, scopes);
    api.authenticate().then(response => {
        if (response.authenticated) {
            localStorage.clear();
            fetch(`backend.php?sessionId=${sessionId}`, {
                body: JSON.stringify(response.accessToken),
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(() => {
                window.close();
                const div = document.body.appendChild(document.createElement("div"));
                div.innerHTML = "Logowanie się powiodło, możesz zamknąć stronę.";
            })
        }
    })
} else if (sessionId && clientId) {
    localStorage.clear();
    localStorage.setItem("sessionId", sessionId);
    localStorage.setItem("clientId", clientId);
    const api = SpotifyApi.withUserAuthorization(clientId, redirectUri, scopes);
    api.authenticate();
}


