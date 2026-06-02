const rest = "http://localhost:2137/";

export class CommunicationController {

    async fetchInfo() {
        const response = await fetch(rest + "info")
        return await response.json();
    }
}