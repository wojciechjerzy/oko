import {Request, Response} from "express";
import {execSync} from "child_process";
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
                execSync(`nmcli connection delete "${name}"`);
            }

            try {
                const output = execSync(`nmcli device wifi connect "${ssid}" password "${psk}" --wait -1`).toString();
                const connected = output.includes("successfully activated");
                if (connected) {
                    execSync(`nmcli connection modify "${ssid}" connection.autoconnect yes`);
                }
                res.json({connected});
            } catch {
                res.json({connected: false});
            }
        }
    };
}