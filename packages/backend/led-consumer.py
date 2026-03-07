import sys
import json
import time
from pi5neo import Pi5Neo

neo = Pi5Neo('/dev/spidev0.0', 100, 800)
neo.set_led_color(0, 255, 255, 255)  # pierwszy biały
for i in range(1, 100):
    neo.set_led_color(i, 0, 0, 0)     # reszta czarna
neo.update_strip()

for raw_data in sys.stdin:
    raw_data = raw_data.strip()
    if not raw_data:
        continue

    msg = json.loads(raw_data)
    t = msg.get("type")
    payload = msg.get("payload", {})

    if t == "init":
        number_of_pixels = payload.get("numberOfPixels")
        neo = Pi5Neo('/dev/spidev0.0', number_of_pixels, 800)

        for i in range(number_of_pixels):
            neo.set_led_color(i, 255, 255, 255)
            neo.update_strip()
            time.sleep(0.1)
            neo.set_led_color(i, 0, 0, 0)

        neo.update_strip()

        print(json.dumps({"status": "init_ok"}), flush=True)

    elif t == "update":
        pixels = payload.get("pixels", [])

        for i, color in enumerate(pixels):
            neo.set_led_color(i, *color)

        neo.update_strip()

        print(json.dumps({"status": "update_ok"}), flush=True)