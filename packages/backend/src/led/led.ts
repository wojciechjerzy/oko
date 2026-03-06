import ws281x from "#led";

export function led() {
    const LED_COUNT = 2;

    ws281x.configure({
        leds: LED_COUNT,
        gpio: 18
    });

    const pixels = new Uint32Array(LED_COUNT);

// LED 0 czerwony
    pixels[0] = 0xff0000;
    ws281x.render(pixels);

    setTimeout(() => {
        // LED 1 niebieski
        pixels[1] = 0x0000ff;
        ws281x.render(pixels);

        setTimeout(() => {
            ws281x.reset();
            process.exit(0);
        }, 500);

    }, 1000);
}
