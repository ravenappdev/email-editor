import express from "express";
import bodyParser from "body-parser";
import handleRender from "./main/requestProcessor.js";
import e from "cors";

const app = express();
app.use(e({ origin: true, credentials: true }));
app.use(bodyParser.json());
app.post("/api/html", (req, res) => {
  const response = handleRender(req.body.app);
  res.statusCode = 200;
  res.setHeader("content-type", "text/plain");
  // Send the rendered page back to the client.
  res.send(response);
});

app.listen(process.env.PORT || 8080);
