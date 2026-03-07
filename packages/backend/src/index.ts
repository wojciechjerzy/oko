import express from "express";
import cors from "cors";
import {info} from "./info.js";
import {light} from "./light.js";
import {PixelClock} from "./PixelClock.js";

const PORT = 2137;
const app = express();
app.use(express.json());
app.use(cors());

app.get("/info", info());
app.get("/light", light());
app.use(express.static("../frontend/dist"));

app.listen(PORT, () => console.log(`Sleep server listening on http://localhost:${PORT}`));

await new PixelClock({numberOfPixels: 24})
    .initialize()
    .then(clock => clock.start())
    .catch(() => console.log("Clock not working"));
