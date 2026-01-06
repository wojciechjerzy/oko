export async function exchangeToken(clientId: string, codeVerifier: string, redirectUri: string, code: string) {
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
    return await res.json();
}