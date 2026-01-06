export function saveToken(sessionId: string, token: any) {
    fetch(`backend.php?sessionId=${sessionId}`, {
        body: JSON.stringify(token),
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }
    }).then(() => window.close())
}