import {Request, Response} from "express";
import {execSync} from "child_process";

export function wifiPostEndpoint() {
    return (req: Request, res: Response) => {
        const {ssid, psk}: { ssid: string; psk: string } = req.body;

        const existing = execSync("nmcli -t -f NAME,TYPE connection show")
            .toString()
            .trim()
            .split("\n")
            .filter(line => line.includes(":802-11-wireless"))
            .map(line => line.split(":")[0]);

        for (const name of existing) {
            execSync(`nmcli connection delete "${name}"`);
        }

        try {
            execSync(`nmcli device wifi connect "${ssid}" password "${psk}"`);
            const state = execSync("nmcli -t -f GENERAL.STATE device show wlan0").toString();
            const connected = state.includes("100 (connected)");
            res.json({connected});
        } catch {
            res.json({connected: false});
        }
    };
}