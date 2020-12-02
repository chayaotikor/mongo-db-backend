const express = require("express");
const configureMiddleware = require("../middleware/globalMiddleware");
const { rootResolver } = require("../data/resolvers");

const server = express();

configureMiddleware(server);

server.use(
//remove graphQL and use traditional routes
);

module.exports = server;
