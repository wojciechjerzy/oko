import {Request, Response} from "express";
import {execSync} from "child_process";

export function shutdown() {
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
            const result = execSync("sudo shutdown -h now").toString().trim();
            return res.json({
                value: result

            });
        }
    };
}