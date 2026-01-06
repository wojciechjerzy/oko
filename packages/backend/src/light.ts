import {Request, Response} from "express";
import {execSync} from "child_process";
import {readFileSync} from "fs";

export function light() {
    return (req: Request, res: Response) => {
        const platform = process.platform;
        if (platform === "win32") {
            return res.json({
                value: 100
            });
        } else if (platform === "darwin") {
            return res.json({
                value: 100
            });
        } else {
            const device = execSync("ls /sys/class/backlight/").toString().trim();
            const rawValue = req.query.value;
            if (rawValue) {
                const normalized = Math.max(0, Math.min(100, rawValue ? parseInt(rawValue as string) : 0));
                const brightness = Math.floor(1 + (normalized / 100) * 254);
                execSync(`echo ${brightness} | sudo tee /sys/class/backlight/${device}/brightness`);
            }
            const brightness = parseInt(readFileSync(`/sys/class/backlight/${device}/brightness`, {encoding: "utf8"}));
            const normalized = Math.floor(brightness / 255 * 100);
            return res.json({
                value: normalized
            });
        }
    }; 
}