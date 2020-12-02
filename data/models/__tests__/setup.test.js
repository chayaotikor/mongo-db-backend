const {assert, expect} = require("chai");
const mongoose = require("mongoose");

before((done) => {
       mongoose.models = {};
       mongoose.modelSchemas = {};
      mongoose.connection.on(
        "error",
        console.error.bind(console, "connection error")
      );
      mongoose.connection.once("open", () => {
        console.log("Connected to test database!");
      });
      mongoose.connect("mongodb://localhost/testDatabase", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      done();
    });
    after((done) => {
      mongoose.connection.close(() => {
        done();
      });
    });
