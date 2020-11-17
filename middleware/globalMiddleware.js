const helmet = require("helmet");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const corsOptions = {
  origin: true,
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  optionsSuccessStatus: 200,
};

module.exports = (server) => {
  server.use(helmet());
  server.use(express.json());
  server.use(morgan("short"));
  server.use(cors(corsOptions));
};
