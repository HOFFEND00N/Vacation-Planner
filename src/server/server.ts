import path from "path";
import express from "express";
import nconf from "nconf";
import { Sequelize, DataTypes } from "sequelize";
import { sso } from "node-expose-sspi";
import { CONFIG } from "../constants";
import { makeIndexHtml } from "./makeIndexHtml";
import { setupConfig } from "./setupConfig";

setupConfig();

const port = nconf.get(CONFIG.SITE_SERVER_PORT);
const sequelize = new Sequelize(nconf.get(CONFIG.DB_CONNECTION));
sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

const User = sequelize.define("User", {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
  },
});
User.sync();

const server = express();

server.use(sso.auth());
server.use(express.static("dist"));

server.get("/user", async (req, res) => {
  const currentUser = await User.findAll();
  res.send({ user: currentUser[0] });
});

server.post("/plan-vacation", (req, res) => {
  res.set("Content-Type", "application/json");
  res.send({ message: "saved to db" });
});

server.get("*", (req, res) => {
  if (process.env.mode === "development") {
    res.send(makeIndexHtml());
  } else {
    res.sendFile(path.resolve(__dirname, "../index.html"));
  }
});

server.listen(port, () => {
  console.log(`The app server is running on port: ${port}`);
});
//TODO: study rest API
