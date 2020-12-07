const { assert, expect } = require("chai");
const judgeResolver = require("../judgeResolver");
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

describe("Testing judge collection resolvers", () => {
  const judgeExample = {
    name: "Judge Judy",
    court: "Eastern District Court of Public Opinion",
    performanceReview: fs.readFileSync(
      path.resolve(__dirname, "../../../pdfs/example_review_1.pdf")
    ),
  };
  let judgeId;
  after((done) => {
    mongoose.connection.collections["judges"].drop((err) => {
      if (err) console.log(err);
      done();
    });
  });
  it("Should add a judge to the collection and return the doc", async () => {
    try {
      const result = await judgeResolver.addJudge(judgeExample);
      judgeId = result._id;
      assert.equal(result.name, "Judge Judy");
    } catch (error) {
      assert(false, error.message);
    }
  });
  it("Should return the doc of the requested judge", async () => {
    try {
      const result = await judgeResolver.getJudge(judgeId);
      assert.equal(result.name, "Judge Judy");
      assert.equal(result.court, "Eastern District Court of Public Opinion");
    } catch (error) {
      assert(false, error.message);
    }
  });
  it("Should update the doc of the specified judge", async () => {
    try {
      const updatedJudge = {
        name: "Judy Smith",
        court: "Eastern District of New York",
      };
      const result = await judgeResolver.updateJudge(updatedJudge, judgeId);
      assert.equal(result.name, "Judy Smith");
      assert.equal(result.court, "Eastern District of New York");
    } catch (error) {
      assert(false, error.message);
    }
  });
  it("Should return the docs of all judges", async () => {
    try {
      const judgeExample2 = {
        name: "Judge Joe Brown",
        court: "Western District Court of Public Opinion",
        performanceReview: fs.readFileSync(
          path.resolve(__dirname, "../../../pdfs/example_review_2.pdf")
        ),
      };
      await judgeResolver.addJudge(judgeExample2);

      let result = await judgeResolver.getAllJudges();

      assert.equal(result.length, 2);
      assert.equal(result[0].name, "Judy Smith");
      assert.equal(result[1].name, "Judge Joe Brown");
    } catch (error) {
      assert(false, error.message);
    }
  });
  it("Should delete the doc of the specified judge and return all judges", async () => {
    try {
      const result = await judgeResolver.deleteJudge(judgeId);

      assert.equal(result.deletedCount, 1)
    } catch (error) {
      assert(false, error.message);
    }
  });
});
