import {MyEvent} from "../../utils/MyEvent";


export class ClockController {
    public event: MyEvent = new MyEvent()

    constructor() {
        this.loop();
    }

    async loop() {
        while (true) {
            this.event.invoke();
            await new Promise(r => setTimeout(r, 60000));
        }
    }

    getTime() {
        return Date.now();
    }

    getMinutes(timeStamp: number) {
        return new Date(timeStamp).getMinutes().toString().padStart(2, "0");
    }

    getHours(timeStamp: number) {
        return new Date(timeStamp).getHours().toString().padStart(2, "0");
    }
}