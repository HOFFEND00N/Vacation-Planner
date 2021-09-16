import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const server = express();
const port = process.env.PORT || 3000;
const fileName = fileURLToPath(import.meta.url);
const dirName = path.dirname(fileName);

server.listen(port, () => {
  console.log(`The app server is running on port: ${port}`);
});

const HTML_FILE = path.join(dirName, "index.html");

server.use(express.static("dist"));

server.get("/", (req, res) => {
  res.sendFile(HTML_FILE, (err) => {
    if (err) console.log(err);
  });
});
