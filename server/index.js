import express from "express";
import path from "path";
import ejs from "ejs";
import bodyParser from "body-parser";
import { handleRender } from "./requestProcessor.js";
import e from "cors";

const app = express();

app.engine("html", ejs.renderFile);
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "./build")));

app.get("/email-editor", function(req, res) {
    res.render("index.ejs");
    // res.sendFile(path.join(__dirname, "./build", "index.html"));
});

app.use(e({ origin: true, credentials: true }));
app.use(bodyParser.json());
app.post("/api/html", handleRender);

app.listen(process.env.PORT || 8080);

module.exports = app;
