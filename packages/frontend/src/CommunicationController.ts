const rest = "http://localhost:2137/";

export class CommunicationController {

    async fetchInfo() {
        const response = await fetch(rest + "upgrade")
        return await response.json();
    }
}