import express from "express";
import * as path from "path";
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const app = express();
const port = process.env.PORT || 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.listen(port, () => {
  console.log(`The app server is running on port: ${port}`);
});

const DIST_DIR = path.join(__dirname, "dist");
const HTML_FILE = path.join(DIST_DIR, "index.html");

app.use(express.json());
app.use(express.static("public"));
app.use(express.static("dist"));

app.get("/", (req, res) => {
  res.sendFile(HTML_FILE, function(err){
    if(err){
      res.status(500).send(err);
    }
  });
});
