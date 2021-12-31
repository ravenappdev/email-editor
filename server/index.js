import express from "express";
import bodyParser from "body-parser";
import { handleRender } from "./requestProcessor.js";
import e from "cors";

const app = express();
app.use(e({ origin: true, credentials: true }));
app.use(bodyParser.json());
app.post("/api/html", handleRender);

app.listen(process.env.PORT || 8080);
