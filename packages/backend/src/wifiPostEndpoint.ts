import {Request, Response} from "express";
import {execFileSync, execSync} from "child_process";
import {isRaspberryPi} from "./isRaspberryPi.js";

export function wifiPostEndpoint() {
    return (req: Request, res: Response) => {
        const {ssid, psk}: { ssid: string; psk: string } = req.body;

        console.log(`connecting to ${ssid} with psk ${psk}`)
        if (isRaspberryPi) {

            const existing = execSync("nmcli -t -f NAME,TYPE connection show")
                .toString()
                .trim()
                .split("\n")
                .filter(line => line.includes(":802-11-wireless"))
                .map(line => line.split(":")[0]);

            for (const name of existing) {
                execFileSync("sudo", ["nmcli", "connection", "delete", name]);
            }

            try {
                execFileSync("sudo", [
                    "nmcli", "connection", "add",
                    "type", "wifi",
                    "con-name", ssid,
                    "ssid", ssid,
                    "ifname", "wlan0",
                    "wifi-sec.key-mgmt", "wpa-psk",
                    "wifi-sec.psk", psk,
                    "connection.autoconnect", "yes",
                ]);
                const output = execFileSync("sudo", ["nmcli", "connection", "up", ssid, "--wait", "-1"]).toString();
                const connected = output.includes("successfully activated");
                res.json({connected});
            } catch {
                res.json({connected: false});
            }
        }
    };
}