import {MyEvent} from "../../utils/MyEvent";
import heeheeUrl from "../../assets/michael-jackson-hee-hee.mp3?url";

export class ClockController {
    public event: MyEvent = new MyEvent()
    private now: number = 0;
    private audio: HTMLAudioElement;

    constructor() {
        this.audio = new Audio(heeheeUrl);
        this.loop();
    }

    async loop() {
        while (true) {
            this.event.invoke();
            this.tryPlayHeeHee();
            this.now = Date.now();
            await new Promise(r => setTimeout(r, 60000));
        }
    }

    private tryPlayHeeHee() {
        const date = new Date(this.now);
        if (date.getMinutes() === 0) {
            const hour = date.getHours();
            if (hour >= 10 && hour <= 20) {
                this.playHeeHee();
            }
        }
    }

    public playHeeHee() {
        this.audio.play();
    }

    getTime() {
        return this.now;
    }

    getMinutes(timeStamp: number) {
        return new Date(timeStamp).getMinutes().toString().padStart(2, "0");
    }

    getHours(timeStamp: number) {
        return new Date(timeStamp).getHours().toString().padStart(2, "0");
    }
}