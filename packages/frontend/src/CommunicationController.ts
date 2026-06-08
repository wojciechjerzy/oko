const rest = "http://localhost:2137/";

export type Info = {
    ok: true
    host: string,
    networks: { ssid: string | null, psk: string | null }[]
    availableNetworks: { ssid: string, signal: number }[]
}


export class CommunicationController {

    async fetchInfo(): Promise<Info> {
        const response = await fetch(rest + "info")
        return await response.json();
    }

    async saveWifi(params: { ssid: string; psk: string }) {
        const response = await fetch(rest + "wifi", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(params),
        });
        return await response.json();
    }

    async setBrightness(number: number) {
        return await (await fetch(rest + `light?value=${number}`)).json();
    }
}