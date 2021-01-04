const request = require("supertest");
const { assert, expect } = require("chai");
const server = require("../../../api/server");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const mongoose = require("mongoose");

describe("Candidate route tests", () => {
  const candidateExample = {
    name: "Jane Doe",
    requestedOffice: null,
    // candidateQuestionnaire: fs.readFileSync(
    //   path.resolve(__dirname, "../../../pdfs/example__questionnaire_1.pdf")
    // ),
  };

  before((done) => {
    const office = {
      officeTitle: "County Commissioner",
    //   officeDuties: fs.readFileSync(
    //     path.resolve(__dirname, "../../../pdfs/county_commissioner_duties.pdf")
    //   ),
      candidates: [],
    };
    request(server)
      .post("/offices")
      .send(office)
      .then((res) => {
        console.log("res", res);
      });
    done();
  });
  after((done) => {
    mongoose.connection.collections["candidates"].drop((err) => {
      if (err) console.log(err);
    });
    mongoose.connection.collections["offices"].drop((err) => {
      if (err) console.log(err);
      done();
    });
  });
  it("Should add a candidate to the DB and return the doc along with 201 status code", async () => {
    const response = await request(server)
      .post("/candidates")
      .send(candidateExample);
    assert.equal(response.status, 201);
  });
});
