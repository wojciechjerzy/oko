import {Request, Response} from "express";
import {execFileSync, execSync} from "child_process";
import {isRaspberryPi} from "./isRaspberryPi.js";

export function wifiPostEndpoint() {
    return (req: Request, res: Response) => {
        const {ssid, psk}: { ssid: string; psk: string } = req.body;

        console.log(`connecting to ${ssid} with psk ${psk}`)
        console.log(["nmcli", "connection", "add",
            "type", "wifi",
            "con-name", ssid,
            "ssid", ssid,
            "ifname", "wlan0",
            "wifi-sec.key-mgmt", "wpa-psk",
            "wifi-sec.psk", psk,
            "connection.autoconnect", "yes",].join(" "))
        if (isRaspberryPi) {

            const existing = execSync("nmcli -t -f NAME,TYPE connection show")
                .toString()
                .trim()
                .split("\n")
                .filter(line => line.includes(":802-11-wireless"))
                .map(line => line.split(":")[0]);

            for (const name of existing) {
                execFileSync("nmcli", ["connection", "delete", name]);
            }

            try {
                const addResutls = execFileSync("nmcli", [
                    "connection", "add",
                    "type", "wifi",
                    "con-name", ssid,
                    "ssid", ssid,
                    "ifname", "wlan0",
                    "wifi-sec.key-mgmt", "wpa-psk",
                    "wifi-sec.psk", psk,
                    "connection.autoconnect", "yes",
                ]).toString();

                const upResults = execFileSync("nmcli", ["connection", "up", ssid, "--wait", "-1"]).toString();

                res.json({
                    addResutls,
                    upResults
                });
            } catch (e) {
                res.json({e});
            }
        }
    };
}