import {Request, Response} from "express";
import os from "os";

export function healthGet() {
    return (_req: Request, res: Response) => {
        res.json({ok: true, host: os.hostname()});
    };
}