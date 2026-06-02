import {Request, Response} from "express";
import os from "os";
import {execSync} from "child_process";
import {isRaspberryPi} from "./isRaspberryPi.js";
import {getWifis} from "./getWifis.js";

function getNetworks() {
    if (!isRaspberryPi) {
        return [{ssid: null, psk: null}]
    }
    const dir = "/etc/NetworkManager/system-connections";
    const files = execSync(`sudo ls ${dir}`).toString().trim().split("\n");

    return files
        .filter(f => f.length > 0)
        .map(file => {
            const content = execSync(`sudo cat "${dir}/${file}"`).toString();
            const ssid = content.match(/^ssid=(.+)$/m)?.[1] ?? null;
            const psk = content.match(/^psk=(.+)$/m)?.[1] ?? null;
            return {ssid, psk};
        })
        .filter(n => n.ssid);
}

export type Info = {
    ok: true
    host: string,
    networks: { ssid: string | null, psk: string | null }[]
    availableNetworks: { ssid: string }[]
}

export function info() {
    return async (_req: Request, res: Response) => {


        const networks = getNetworks();


        const newVar: Info = {
            ok: true,
            host: os.hostname(),
            networks,
            availableNetworks: await getWifis()
        };
        res.json(newVar);
    };
}