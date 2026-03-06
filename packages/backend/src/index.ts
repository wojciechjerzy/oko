import express from "express";
import cors from "cors";
import {info} from "./info";
import {light} from "./light";
import {led} from "./led/led";

const PORT = 2137;
const app = express();
app.use(express.json());
app.use(cors());

app.get("/info", info());
app.get("/light", light());
app.use(express.static("../frontend/dist"));

app.listen(PORT, () => console.log(`Sleep server listening on http://localhost:${PORT}`));

led();