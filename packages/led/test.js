const ws2821x = require('rpi-ws281x-native');
const options = {
    dma: 10,
    freq: 800000,
    gpio: 18,
    invert: false,
    brightness: 255,
    stripType: ws281x.stripType.WS2812
};

const channel = ws281x(10, options);
const colors = channel.array;

// update color-values
colors[0] = 0xffcc22;
ws281x.render();
