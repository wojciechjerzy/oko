import {ChildProcessByStdio, spawn} from "child_process";
import {fileURLToPath} from "url";
import path from "path";
import {Readable, Writable} from "stream";

export class Pixels {
    private declare process: ChildProcessByStdio<Writable, Readable, null>;
    public numberOfPixels: number;

    constructor(config: { numberOfPixels: number }) {
        this.numberOfPixels = config.numberOfPixels;
    }

    async initialize(): Promise<void> {
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        const script = path.join(__dirname, "../led-consumer.py");

        await new Promise<void>((resolve, reject) => {
            const proc = spawn(
                process.env.HOME + "/ws281env/bin/python",
                [script],
                {stdio: ["pipe", "pipe", "inherit"]}
            );

            proc.once("error", reject);
            proc.once("spawn", () => {
                this.process = proc;
                resolve();
            });
        });

        process.on("exit", () => {
            if (this.process) {
                this.process.kill();
            }
        });

        await this.send({
            type: "init",
            payload: {
                numberOfPixels: this.numberOfPixels
            }
        });
    }

    async send(data: PixelsData): Promise<any> {
        if (!this.process) throw new Error("Process not initialized");

        return new Promise((resolve, reject) => {
            const onData = (chunk: Buffer) => {
                this.process.stdout.off("data", onData);
                resolve(chunk.toString());
            };

            this.process.stdout.on("data", onData);
            this.process.stdin.write(JSON.stringify(data) + "\n");
        });
    }

    async update(pixels: RGB[]): Promise<any> {
        return this.send({
            type: "update",
            payload: {
                pixels
            }
        });
    }
}

type PixelsInit = {
    type: "init";
    payload: {
        numberOfPixels: number;
    };
};

type PixelsUpdate = {
    type: "update";
    payload: {
        pixels: RGB[];
    };
};

export type PixelsData = PixelsInit | PixelsUpdate;
export type RGB = [number, number, number];