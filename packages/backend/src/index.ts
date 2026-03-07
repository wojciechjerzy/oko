import express from "express";
import cors from "cors";
import {info} from "./info";
import {light} from "./light";
import {Pixels} from "./Pixels.js";

const PORT = 2137;
const app = express();
app.use(express.json());
app.use(cors());

app.get("/info", info());
app.get("/light", light());
app.use(express.static("../frontend/dist"));

app.listen(PORT, () => console.log(`Sleep server listening on http://localhost:${PORT}`));

const pixels = new Pixels({
    numberOfPixels: 24
});
try {
    await pixels.initialize();
    console.log("Pixels initialized")

    await new Promise(resolve => setTimeout(resolve, 1000));
    await pixels.update([
        [255, 0, 0],
        [0, 255, 0],
        [0, 0, 255]
    ]);
} catch {
    console.log("Pixels not initialized")
}