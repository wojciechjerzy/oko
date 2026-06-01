import {Request, Response} from "express";
import {execSync} from "child_process";

export function upgrade(repoPath: string) {
    return (req: Request, res: Response) => {
        const output = execSync("git pull", {cwd: repoPath}).toString().trim();
        res.json({output});
        execSync("sudo reboot");
    };
}