import express from "express";
import minify from "express-minify";
import { readFileSync } from "node:fs";

const markup = readFileSync("public/index.html", { encoding: "utf-8" });

const app = express();

app.use(minify());

app.use("/scripts", express.static("dist/scripts"));

app.use("/styles", express.static("public/styles"));

app.get("/", (_request, response) => {
  response.send(markup);
});

app.listen(8642);
