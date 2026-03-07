import board
import neopixel_spi as neopixel
import time

# Konfiguracja
PIXEL_COUNT = 3  # Liczba diod
PIXEL_PIN = board.SPI() # Używamy SPI

# Inicjalizacja taśmy
pixels = neopixel.NeoPixel_SPI(PIXEL_PIN, PIXEL_COUNT, pixel_order=neopixel.GRB)

def set_color():
    # Ustawienie kolorów (R, G, B)
    pixels.fill((255, 0, 0)) # Czerwony
    pixels.show()
    time.sleep(1)

    pixels.fill((0, 255, 0)) # Zielony
    pixels.show()
    time.sleep(1)

    pixels.fill((0, 0, 255)) # Niebieski
    pixels.show()
    time.sleep(1)

    # Czyszczenie
    pixels.fill((0, 0, 0))
    pixels.show()

if __name__ == "__main__":
    try:
        print("Uruchamianie testu LED... Naciśnij Ctrl+C aby wyjść.")
        while True:
            set_color()
    except KeyboardInterrupt:
        pixels.fill((0, 0, 0))
        pixels.show()
        print("\nZatrzymano.")