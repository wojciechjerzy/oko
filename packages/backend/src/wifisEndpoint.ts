import {Request, Response} from "express";
import {getWifis} from "./getWifis.js";

export function wifisEndpoint() {
    return (req: Request, res: Response) => {

        const networks = getWifis();

        res.json(networks);
    };
}