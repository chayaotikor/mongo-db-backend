const { assert, expect } = require("chai");
const proposalResolver = require("../proposalResolver");
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

describe("Testing proposal collection resolvers", () => {
  const proposalExample = {
    proposalName: "76",
    proposalDetails: fs.readFileSync(
      path.resolve(__dirname, "../../../pdfs/amendment_76.pdf")
    ),
    proposalLanguage: fs.readFileSync(
      path.resolve(__dirname, "../../../pdfs/amendment_76_language.pdf")
    ),
    };
    
  let proposalId;
  after((done) => {
    mongoose.connection.collections["proposals"].drop((err) => {
      if (err) console.log(err);
      done();
    });
  });
  it("Should add a proposal to the collection and return the doc", async () => {
    try {
      const result = await proposalResolver.addProposal(proposalExample);
      proposalId = result._id;
      assert.equal(result.proposalName, "76");
    } catch (error) {
      assert(false, error.message);
    }
  });
  it("Should return the doc of the requested proposal", async () => {
    try {
      const result = await proposalResolver.getProposal(proposalId);
      assert.equal(result.proposalName, "76");
 
    } catch (error) {
      assert(false, error.message);
    }
  });
  it("Should update the doc of the specified proposal", async () => {
    try {
      const updatedProposal = {
        proposalName: "77",

      };
      const result = await proposalResolver.updateProposal(
        updatedProposal,
        proposalId
      );
      assert.equal(result.proposalName, "77");
          let testHash1 = crypto.createHash("sha256");
          testHash1.update(result.proposalDetails);
          let detailsResultHex = testHash1.digest("hex");

          let testHash2 = crypto.createHash("sha256");
          testHash2.update(
            fs.readFileSync(
              path.resolve(__dirname, "../../../pdfs/amendment_76.pdf")
            )
          );
        let expectedResultHex = testHash2.digest("hex");
        
      assert.equal(detailsResultHex, expectedResultHex);
    } catch (error) {
      assert(false, error.message);
    }
  });
  it("Should return the docs of all proposals", async () => {
    try {
      const proposalExample2 = {
        proposalName: "ee",
        proposalDetails: fs.readFileSync(
          path.resolve(__dirname, "../../../pdfs/proposition_ee.pdf")
        ),
          proposalLanguage: fs.readFileSync(
          path.resolve(__dirname, "../../../pdfs/proposition_ee_language.pdf")
        ),
      };
      await proposalResolver.addProposal(proposalExample2);

      let result = await proposalResolver.getAllProposals();

      assert.equal(result.length, 2);
      assert.equal(result[0].proposalName, "77");
      assert.equal(result[1].proposalName, "ee");
    } catch (error) {
      assert(false, error.message);
    }
  });
  it("Should delete the doc of the specified proposal and return all proposals", async () => {
    try {
      const result = await proposalResolver.deleteProposal(proposalId);

      assert.equal(result.length, 1);
      assert.equal(result[0].proposalName, "ee");
    } catch (error) {
      assert(false, error.message);
    }
  });
});
