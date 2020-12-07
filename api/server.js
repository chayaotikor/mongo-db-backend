const express = require("express");
const configureMiddleware = require("../middleware/globalMiddleware");
const errorHandler = require("../middleware/errorHandler")
const candidateRoutes = require("../data/routes/candidateRoutes");
const judgeRoutes = require("../data/routes/judgeRoutes");
const officeRoutes = require("../data/routes/officeRoutes");
const proposalRoutes = require("../data/routes/proposalRoutes");

const server = express();

configureMiddleware(server);

server.use('/candidates', candidateRoutes);
// server.use('/judges', judgeRoutes);
// server.use('/offices', officeRoutes);
// server.use('/proposals', proposalRoutes);

server.use(errorHandler)

module.exports = server;
