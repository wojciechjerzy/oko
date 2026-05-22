#!/usr/bin/env python3
import usb.core
import usb.util
import sys

VID = 0x0712
PID = 0x000a

class BrightnessController:
    def __init__(self):
        self.dev = usb.core.find(idVendor=VID, idProduct=PID)
        if self.dev is None:
            raise ValueError("Device not found")

        print("Device found")

        self._driver_was_active = False
        try:
            if self.dev.is_kernel_driver_active(0):
                self._driver_was_active = True
                self.dev.detach_kernel_driver(0)
        except:
            pass

        self.dev.set_configuration()
        cfg = self.dev.get_active_configuration()
        intf = cfg[(0, 0)]

        self.ep = usb.util.find_descriptor(
            intf,
            custom_match=lambda e: usb.util.endpoint_direction(e.bEndpointAddress)
                                   == usb.util.ENDPOINT_OUT
        )

        if self.ep is None:
            raise ValueError("Endpoint not found")

    def _send(self, level):
        level = max(0, min(255, int(level)))
        checksum = (~level) & 0xFF
        packet = [0x09, 0x08, 0xF7, level, checksum]
        self.ep.write(packet)

    def set_brightness(self, level):
        level = max(0, min(255, int(level)))

        self._send(0)
        self._send(level)
        self._send(level)

        print(f"Brightness set to: {level}")

        usb.util.dispose_resources(self.dev)
        if self._driver_was_active:
            self.dev.attach_kernel_driver(0)


if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: sudo python3 brightness.py <0-255>")
        sys.exit(1)

    ctl = BrightnessController()
    ctl.set_brightness(sys.argv[1])