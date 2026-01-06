import {Request, Response} from "express";
import {runSleepCommand} from "./runSleepCommand";

export function sleepGet() {
    return (req: Request, res: Response) => {
        runSleepCommand((err, stdout, stderr) => {
            if (err) {
                res.status(500).json({
                    ok: false,
                    error: "Sleep command failed",
                    details: err.message,
                    stderr: stderr || "",
                });
                return;
            }

            res.json({
                ok: true,
                message: "Sleep triggered",
                stdout: stdout || "",
            });
        });
    };
}