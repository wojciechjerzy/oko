import {CommunicationController} from "../../CommunicationController";
import {State} from "../../State";

export class PhotoController {
    private communication: CommunicationController;
    private state: State;

    constructor({state, communicationController}: { state: State, communicationController: CommunicationController }) {
        this.communication = communicationController;
        this.state = state;
    }

    async getPhotoUrl(): Promise<string> {
        const value = this.state.photoUrl.value;
        if (!value) {
            return "";
        }
        const image = document.createElement("img");
        image.crossOrigin = "anonymous";
        image.src = `http://localhost:2137/photo?url=${value}&` + Math.random();
        const base64 = await new Promise<string>(resolve => image.onload = () => {
            const canvas = document.createElement("canvas");
            canvas.width = image.naturalWidth;
            canvas.height = image.naturalHeight;

            const ctx = canvas.getContext("2d")!;
            ctx.drawImage(image, 0, 0);

            const base64 = canvas.toDataURL("image/jpeg");
            resolve(base64);
        });
        return base64;
    }
}