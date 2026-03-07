import board
import neopixel
import time

PIXEL_PIN = board.D18      # GPIO18
NUM_PIXELS = 2
ORDER = neopixel.GRB       # jeśli kolory będą złe, zmień na neopixel.RGB

pixels = neopixel.NeoPixel(
    PIXEL_PIN,
    NUM_PIXELS,
    brightness=0.2,
    auto_write=False,
    pixel_order=ORDER
)

pixels.fill((0, 0, 0))
pixels[0] = (255, 0, 0)    # pierwszy LED na czerwono
pixels[1] = (0, 0, 0)      # drugi wyłączony
pixels.show()

while True:
    time.sleep(1)