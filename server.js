"use strict";
require("dotenv").config();
require('./models');
const Hapi = require("@hapi/hapi");
const Mongoose = require("mongoose");
const Path = require('path');

const server = Hapi.server({
  port: 3000,
  host: "localhost",
});

Mongoose.connect(process.env.DB_HOST, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const init = async () => {
  await server.register({
    plugin: require('hapi-auto-route'),
    options: {
      routes_dir: Path.join(__dirname, 'routes')
    }
   });
  await server.start();
  console.log("Server running on %s", server.info.uri);
};

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

init();
