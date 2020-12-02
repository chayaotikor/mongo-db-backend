const { assert, expect } = require("chai");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const Office = require("../officeModel");

let officeExample = {
  officeTitle: "Governor",
  officeDuties: null,
  candidates: [],
};

describe("Office Model Tests", () => {
  before((done) => {
    officeExample.officeDuties = fs.readFileSync(
      path.resolve(__dirname, "../../../pdfs/governor_duties.pdf")
    );

    done();
  });
  //POSITIVE TESTS
  it("Should save a correctly formatted office and return the doc", async () => {
    const newOffice = Office(officeExample);

    let result = await newOffice.save();

    //testing duties pdf hashing
    let testHash1 = crypto.createHash("sha256");
    testHash1.update(result.officeDuties);
    let dutiesResultHex1 = testHash1.digest("hex");

    let testHash2 = crypto.createHash("sha256");
    testHash2.update(
      fs.readFileSync(
        path.resolve(__dirname, "../../../pdfs/governor_duties.pdf")
      )
    );
    let expectedResultHex1 = testHash2.digest("hex");
    try {
      assert.equal(result.officeTitle, "Governor");
      assert.equal(dutiesResultHex1, expectedResultHex1);
    } catch (error) {
      assert(false, error.message);
    }
  });

  //NEGATIVE TESTS
  it("Should NOT allow validation of offices with undefined title", async () => {
    let clonedOffice = Object.assign({}, officeExample);
    clonedOffice.officeTitle = undefined;

    const missingTitle = Office(clonedOffice);
    try {
      await missingTitle.validate();
      assert(false, "Empty office title accepted.");
    } catch (err) {
      assert.equal(err.errors.officeTitle, "Office title required.");
    }
  });

  it("Should NOT allow validation of office without duty file", async () => {
    let clonedOffice = Object.assign({}, officeExample);
    clonedOffice.officeDuties = undefined;
    let missingDuties = Office(clonedOffice);
    try {
      await missingDuties.validate();
      assert(false, "Empty duties list accepted.");
    } catch (err) {
      assert.equal(err.errors.officeDuties, "Office duties file required.");
    }
  });
});
