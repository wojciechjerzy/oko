import {Request, Response} from "express";
import {execSync} from "child_process";

export function light() {
    return (req: Request, res: Response) => {

        const value = Math.min(100, Math.max(0, parseFloat(req.query.value as string ?? "100"))) ?? 100;
        const brightness = Math.min(255, Math.max(1, Math.floor(value / 100) * 255));

        const platform = process.platform;
        if (platform === "win32") {
            //nothing
        } else if (platform === "darwin") {
            //nothing
        } else {
            const lsusbOutput = execSync("lsusb 2>/dev/null || echo ''").toString();
            const hasWaveshare = lsusbOutput.includes("ID 0712:000a");
            const backlightList = execSync("ls /sys/class/backlight/ 2>/dev/null || echo ''").toString().trim();
            const hasBacklight = backlightList.length > 0;

            if (hasWaveshare) {
                console.log("chaning brightness to waveshare")
                console.log(execSync(`sudo python3 brightness.py ${brightness}`));
            } else if (hasBacklight) {
                console.log("chaning brightness to backlight")
                console.log(execSync(`echo ${brightness} | sudo tee /sys/class/backlight/${backlightList}/brightness`));
            }
        }
        return res.json({
            value: 100
        });
    };
}