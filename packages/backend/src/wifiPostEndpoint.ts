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

            try {
                const connectOutput = execFileSync("nmcli", ["device", "wifi", "connect", ssid, "password", psk]).toString();
                const connected = connectOutput.includes("successfully activated");
                if (connected) {
                    for (const name of existing) {
                        execFileSync("nmcli", ["connection", "delete", name]);
                    }
                }
                res.json({
                    output: connectOutput,
                    connected
                });

            } catch (e) {
                const stderr = e instanceof Error && "stderr" in e && e.stderr instanceof Buffer ? e.stderr.toString() : String(e);
                console.error("nmcli error:", stderr);
                res.json({connected: false, error: stderr});
            }
        }
    };
}