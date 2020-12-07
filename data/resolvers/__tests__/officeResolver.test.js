const { assert, expect } = require("chai");
const officeResolver = require("../officeResolver");
const { addCandidate } = require("../candidateResolver");
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

describe("Testing office collection resolvers", () => {
  const officeExample = {
    officeTitle: "Governor",
    officeDuties: fs.readFileSync(
      path.resolve(__dirname, "../../../pdfs/governor_duties.pdf")
    ),
    candidates: [],
  };

  let officeId;
  let officeId2;

  after((done) => {
    mongoose.connection.collections["offices"].drop((err) => {
      if (err) console.log(err);
    });
    mongoose.connection.collections["candidates"].drop((err) => {
      if (err) console.log(err);
      done();
    });
  });
  it("Should add a office to the collection and return the doc", async () => {
    try {
      const result = await officeResolver.addOffice(officeExample);
      officeId = result._id;
      assert.equal(result.officeTitle, "Governor");
    } catch (error) {
      assert(false, error.message);
    }
  });

  it("Should return the doc of the requested office", async () => {
    try {
      const result = await officeResolver.getOffice(officeId);
      assert.equal(result.officeTitle, "Governor");
      assert.equal(result._id.toString(), officeId.toString());
    } catch (error) {
      assert(false, error.message);
    }
  });

  it("Should update the doc of the specified office", async () => {
    try {
      const updatedOffice = {
        officeTitle: "Lieutenant Governor",
      };
      const result = await officeResolver.updateOffice(updatedOffice, officeId);
      assert.equal(result.officeTitle, "Lieutenant Governor");
    } catch (error) {
      assert(false, error.message);
    }
  });

  it("Should return the docs of all offices", async () => {
    try {
      const officeExample2 = {
        officeTitle: "State Senator",
        officeDuties: fs.readFileSync(
          path.resolve(__dirname, "../../../pdfs/state_senator_duties.pdf")
        ),
        candidates: [],
      };
      let getId = await officeResolver.addOffice(officeExample2);

      officeId2 = getId._id;

      let result = await officeResolver.getAllOffices();

      assert.equal(result.length, 2);
      assert.equal(result[0].officeTitle, "Lieutenant Governor");
      assert.equal(result[1].officeTitle, "State Senator");
    } catch (error) {
      assert(false, error.message);
    }
  });
  it("Should delete the doc of the specified office and return all offices and a candidates list with related candidates deleted", async () => {
    try {
      const candidateExample = {
        name: "Joe Schmoe",
        requestedOffice: null,
        candidateQuestionnaire: fs.readFileSync(
          path.resolve(__dirname, "../../../pdfs/example__questionnaire_1.pdf")
        ),
      };
      const candidateExample2 = {
        name: "Jill Smith",
        requestedOffice: null,
        candidateQuestionnaire: fs.readFileSync(
          path.resolve(__dirname, "../../../pdfs/example__questionnaire_2.pdf")
        ),
      };

      //Should not be in candidate list after office deletion
      await addCandidate(candidateExample, officeId);
      await addCandidate(candidateExample2, officeId);

      //Should be left in candidate list
      await addCandidate(candidateExample, officeId2);
      await addCandidate(candidateExample2, officeId2);
      await addCandidate(candidateExample2, officeId2);

      const result = await officeResolver.deleteOffice(officeId);

      assert.equal(result.offices.length, 1);
      assert.equal(result.offices[0].officeTitle, "State Senator");
      assert.equal(result.candidates.length, 3);
    } catch (error) {
      assert(false, error.message);
    }
  });
});
