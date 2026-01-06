import {codeChallenge} from "./codeChallenge";

const scopes = [
    'user-read-private',
    'user-read-email',
    'user-read-playback-state',
    'user-read-currently-playing',
    'user-modify-playback-state'
];

export async function redirectToSpotify(clientId: string, redirectUri: string, codeVerifier: string) {

    const code_challenge = await codeChallenge(codeVerifier);
    const authUrl = new URL("https://accounts.spotify.com/authorize")
    const params: {
        response_type: string;
        client_id: string;
        scope: string;
        code_challenge_method: string;
        code_challenge: string;
        redirect_uri: string
    } = {
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