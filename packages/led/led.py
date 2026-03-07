import board
import neopixel
import time

PIXEL_PIN = board.D18
NUM_PIXELS = 2
ORDER = neopixel.GRB

pixels = neopixel.NeoPixel(
    PIXEL_PIN,
    NUM_PIXELS,
    brightness=0.3,
    auto_write=False,
    pixel_order=ORDER
)

pixels[0] = (255, 0, 0)  # pierwszy LED czerwony
pixels[1] = (0, 0, 0)    # drugi LED zgaszony
pixels.show()

while True:
    time.sleep(1)