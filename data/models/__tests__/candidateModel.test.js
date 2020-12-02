const { assert, expect } = require("chai");
const Office = require("../officeModel");
const Candidate = require("../candidateModel");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

describe("Candidate Model Tests", () => {
  const candidateExample = {
    name: "Joe Schmoe",
    requestedOffice: null,
    candidateQuestionnaire: fs.readFileSync(
      path.resolve(__dirname, "../../../pdfs/example__questionnaire_1.pdf")
    ),
  };
  before((done) => {
    const office = Office({
      officeTitle: "Senator",
      officeDuties: fs.readFileSync(
        path.resolve(__dirname, "../../../pdfs/state_senator_duties.pdf")
      ),
      candidates: [],
    });
    office.save().then((res) => {
      candidateExample.requestedOffice = res._id;
      done();
    });
  });
  //POSITIVE TESTS
  it("Should save a correctly formatted candidate and return the doc", async () => {
    const newCandidate = Candidate(candidateExample);

    let result = await newCandidate.save();
    let testHash1 = crypto.createHash("sha256");
    testHash1.update(result.candidateQuestionnaire);
    let questionnaireResultHex = testHash1.digest("hex");

    let testHash2 = crypto.createHash("sha256");
    testHash2.update(
      fs.readFileSync(
        path.resolve(__dirname, "../../../pdfs/example__questionnaire_1.pdf")
      )
    );
    let expectedResultHex = testHash2.digest("hex");

    try {
      assert.equal(result.name, "Joe Schmoe");
      assert.equal(result.requestedOffice.officeTitle, "Senator");
      assert.equal(questionnaireResultHex, expectedResultHex);
    } catch (error) {
      assert(false, error.message);
    }
  });

  //NEGATIVE TESTS
  it("Should NOT allow validation of a candidate with an undefined name", async () => {
    let clonedCandidate = Object.assign({}, candidateExample);
    clonedCandidate.name = undefined;
    const missingName = Candidate(clonedCandidate);

    try {
      await missingName.validate();
      assert(false, "Allowed validation of candidate with empty name string");
    } catch (err) {
      assert.equal(err.errors.name, "Candidate name required.");
    }
  });

    it("Should NOT allow validation of a candidate with an undefined office ID", async () => {
    let clonedCandidate = Object.assign({}, candidateExample);
      clonedCandidate.requestedOffice = undefined;
      const undefinedOffice = Candidate(clonedCandidate);
      
      try {
        await undefinedOffice.validate();

        assert(false, "Allowed validation of an undefined office ID.");
      } catch (err) {
        assert.equal(err.errors.requestedOffice, "Valid office ID required.");
      }
    });
  
    it("Should NOT allow validation of a candidate with an office ID that does not exist", async () => {
    let clonedCandidate = Object.assign({}, candidateExample);
      clonedCandidate.requestedOffice = '123';
      const invalidOffice = Candidate(clonedCandidate);
      
      try {
        await invalidOffice.validate();

        assert(false, "Allowed validation of an undefined office ID.");
      } catch (err) {
        assert.equal(
          err.errors.requestedOffice,
          'CastError: Cast to ObjectId failed for value "123" at path "requestedOffice"'
        );
      }
    });
  
    it("Should NOT allow validation of a candidate without a candidate questionnaire file", async () => {
    let clonedCandidate = Object.assign({}, candidateExample);
    clonedCandidate.candidateQuestionnaire = undefined;
      const undefinedQuestionnaire = Candidate(clonedCandidate);
      
      try {
        await undefinedQuestionnaire.validate();
        assert(
          false,
          "Allowed validation of a candidate with an undefined candidate questionnaire."
        );
      } catch (err) {
        assert.equal(
          err.errors.candidateQuestionnaire,
          "Candidate questionnaire file required."
        );
      }
    });
});
