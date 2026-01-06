import express from "express";
import cors from "cors";
import {sleepGet} from "./sleepGet";
import {healthGet} from "./healthGet";

const PORT = 2137;
const app = express();
app.use(express.json());
app.use(cors());

app.get("/health", healthGet());
app.get("/sleep", sleepGet());

app.listen(PORT, () => console.log(`Sleep server listening on http://localhost:${PORT}`));