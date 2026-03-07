import {Pixels, RGB} from "./Pixels.js";

export class PixelClock {

    private pixels: Pixels;
    private isRunning = false;

    constructor(config: { numberOfPixels: number }) {
        this.pixels = new Pixels(config);
    }

    async initialize(): Promise<this> {
        await this.pixels.initialize();
        return this;
    }

    start() {
        if (this.isRunning) return;
        this.isRunning = true;
        this.loop();
    }

    stop() {
        this.isRunning = false;
    }

    private async loop() {
        const numberOfPixels = this.pixels.numberOfPixels;
        const pixels: RGB[] = Array.from(
            {length: numberOfPixels},
            () => [0, 0, 0] as RGB
        );

        while (this.isRunning) {
            const startedAt = Date.now();

            // wygaszanie
            for (let i = 0; i < pixels.length; i++) {
                pixels[i][0] = 0;
                pixels[i][1] = 0;
                pixels[i][2] = 0;
            }
            for (let i = 0; i < 4; i++) {
                pixels[pixels.length / 4 * i][1] = 255;
            }

            const now = new Date();
            const hour = now.getHours();
            const minute = now.getMinutes();
            const second = now.getSeconds();

            const hourPixel =
                Math.floor(((hour % 12) / 12) * numberOfPixels) % numberOfPixels;

            const minutePixel =
                Math.floor((minute / 60) * numberOfPixels) % numberOfPixels;

            const secondPixel =
                Math.floor((second / 60) * numberOfPixels) % numberOfPixels;

            pixels[hourPixel][0] = 255;
            pixels[minutePixel][0] = 255;
            pixels[secondPixel][0] = 255;


            await this.pixels.update(pixels);

            const elapsed = Date.now() - startedAt;
            const wait = Math.max(0, 500 - elapsed);

            await new Promise(r => setTimeout(r, wait));
        }
    }
}