const { assert, expect } = require("chai");
const mongoose = require("mongoose");
const Judge = require("../judgeModel");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

describe("Judge Model Tests", () => {
  const judgeExample = {
    name: "Judge Judy",
    court: "Eastern District Court of Public Opinion",
    performanceReview: fs.readFileSync(
      path.resolve(__dirname, "../../../pdfs/example_review_1.pdf")
    ),
  };

  after((done) => {
    mongoose.connection.collections["judges"].drop((err) => {
      if (err) console.log(err);
      done();
    });
  });
  //POSITIVE TESTS
  it("Should save a correctly formatted judge and return the doc", async () => {
    const newJudge = Judge(judgeExample);
    let result = await newJudge.save();

    let testHash1 = crypto.createHash("sha256");
    testHash1.update(result.performanceReview);
    let reviewResultHex = testHash1.digest("hex");

    let testHash2 = crypto.createHash("sha256");
    testHash2.update(
      fs.readFileSync(
        path.resolve(__dirname, "../../../pdfs/example_review_1.pdf")
      )
    );
    let expectedResultHex = testHash2.digest("hex");

    assert.equal(result.name, "Judge Judy");
    assert.equal(result.court, "Eastern District Court of Public Opinion");
    assert.equal(reviewResultHex, expectedResultHex);
  });

  //     //NEGATIVE TESTS
  it("Should NOT allow validation of a judge with an undefined name", async () => {
    let clonedJudge = Object.assign({}, judgeExample);
    clonedJudge.name = undefined;
    const missingName = Judge(clonedJudge);

    try {
      await missingName.validate();
      assert(false, "Allowed validation of judge with undefined name");
    } catch (err) {
      assert.equal(err.errors.name, "Judge name required.");
    }
  });

  it("Should NOT allow validation of a judge with an undefined court", async () => {
    let clonedJudge = Object.assign({}, judgeExample);
    clonedJudge.court = undefined;
    const missingCourt = Judge(clonedJudge);

    try {
      await missingCourt.validate();
      assert(false, "Allowed validation of judge with undefined court");
    } catch (err) {
      assert.equal(err.errors.court, "Court served required.");
    }
  });

  it("Should NOT allow validation of a judge with an undefined review", async () => {
    let clonedJudge = Object.assign({}, judgeExample);
    clonedJudge.performanceReview = undefined;
    const missingReview = Judge();

    try {
      await missingReview.validate();
      assert(false, "Allowed validation of judge with undefined review");
    } catch (err) {
      assert.equal(err.errors.performanceReview, "Judge review file required.");
    }
  });
});
