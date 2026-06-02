import {isRaspberryPi} from "./isRaspberryPi.js";
import {execSync} from "child_process";

export async function getWifis() {
    if (!isRaspberryPi) {
        return [];
    }
    const output = execSync("nmcli -t -f SSID,SIGNAL,SECURITY device wifi list").toString();
    const networks = output
        .trim()
        .split("\n")
        .map(line => {
            const [ssid, signal, security] = line.split(":");
            return {ssid, signal: Number(signal), security};
        })
        .filter(n => n.ssid);
    return networks;
}