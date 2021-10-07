// import path from "path";
import express from "express";
import cors from "cors";

const server = express();
const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`The app server is running on port: ${port}`);
});

// const HTML_FILE = path.resolve("./public/index.html");

// server.use(express.static("dist"));
server.use(cors());

server.post("/plan-vacation", (req, res) => {
  res.set("Content-Type", "application/json");
  res.send({ message: "saved to db" });
});

server.get("*", (req, res) => {
  res.send(`<!DOCTYPE html>
<html lang="en">
<head>
  <title>My React App</title>
  <script defer src="http://localhost:3001/main.js"></script></head>
<body>
<div id="root"></div>
</body>
</html>
`);
});
//TODO: study rest API
