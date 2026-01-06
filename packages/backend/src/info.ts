import {Request, Response} from "express";
import os from "os";

export function info() {
    return (_req: Request, res: Response) => {
        res.json({ok: true, host: os.hostname()});
    };
}