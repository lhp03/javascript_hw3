import * as webLib from "./web-lib.mjs";
import * as path from "path";
import * as fs from "fs";

import { fileURLToPath } from "url";

// TODO: configure and start server

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 3000;
const HOST = "localhost";

const readConfig = (callback) => {
  fs.readFile(path.join(__dirname, "config.json"), "utf-8", (err, data) => {
    if (err) {
      console.log("file read failed ", err);
      return;
    }
    data = JSON.parse(data);
    callback(data);
  });
};

const setServer = (config) => {
  const httpServer = new webLib.HTTPServer(
    path.join(path.dirname(__dirname), config.root_directory),
    config.redirect_map
  );

  httpServer.listen(PORT, HOST);
  console.log(`LISTENING ${PORT}...`);
};

readConfig(setServer);
