from rpi_ws281x import PixelStrip, Color
import time

LED_COUNT = 2          # masz 2 diody
LED_PIN = 18           # GPIO18
LED_FREQ_HZ = 800000
LED_DMA = 10
LED_BRIGHTNESS = 64    # 0-255
LED_INVERT = False
LED_CHANNEL = 0

strip = PixelStrip(
    LED_COUNT,
    LED_PIN,
    LED_FREQ_HZ,
    LED_DMA,
    LED_INVERT,
    LED_BRIGHTNESS,
    LED_CHANNEL
)

strip.begin()

# pierwszy LED czerwony
strip.setPixelColor(0, Color(255, 0, 0))

# drugi LED wyłączony
strip.setPixelColor(1, Color(0, 0, 0))

strip.show()

while True:
    time.sleep(1)