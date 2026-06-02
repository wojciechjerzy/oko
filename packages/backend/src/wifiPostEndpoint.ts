import {Request, Response} from "express";

export function wifiPostEndpoint() {
    return (req: Request, res: Response) => {
        console.log("saveWifi", req.body);
        res.json({ok: true});
    };
}