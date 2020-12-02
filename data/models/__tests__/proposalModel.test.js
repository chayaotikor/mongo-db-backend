const { assert, expect } = require("chai");
const Proposal = require("../proposalModel");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");


let proposalExample = {
  proposalName: "76",
  proposalDetails: null,
  proposalLanguage: null,
};

describe("Proposal Model Tests", () => {
  before((done) => {
    proposalExample.proposalDetails = fs.readFileSync(
      path.resolve(__dirname, "../../../pdfs/amendment_76.pdf")
    );

    proposalExample.proposalLanguage = fs.readFileSync(
      path.resolve(__dirname, "../../../pdfs/amendment_76_language.pdf")
    );
    done();
  });
  //POSITIVE TESTS
  it("Should save a correctly formatted proposal and return the doc", async () => {
    const newProposal = Proposal(proposalExample);

    let result = await newProposal.save();

    //testing details pdf hashing
    let testHash1 = crypto.createHash("sha256");
    testHash1.update(result.proposalDetails)
    let detailsResultHex = testHash1.digest('hex')

    let testHash2 = crypto.createHash("sha256");
    testHash2.update(fs.readFileSync(
      path.resolve(__dirname, "../../../pdfs/amendment_76.pdf")
    ))
    let expectedResultHex1 = testHash2.digest('hex')

    //testing language pdf hashing
    let testHash3 = crypto.createHash("sha256");
    testHash3.update(result.proposalLanguage)
    let languageResultHex = testHash3.digest('hex')

    let testHash4 = crypto.createHash("sha256");
    testHash4.update(fs.readFileSync(
      path.resolve(__dirname, "../../../pdfs/amendment_76_language.pdf")
    ))
    let expectedResultHex2 = testHash4.digest('hex')

    assert.equal(result.proposalName, "76");
    assert.equal(detailsResultHex, expectedResultHex1);
    assert.equal(languageResultHex, expectedResultHex2);
  });

  //NEGATIVE TESTS
    it("Should NOT allow validation of a proposal with an undefined name", async () => {
        let clonedProposal = Object.assign({}, proposalExample);
        clonedProposal.proposalName = undefined

      const missingName = Proposal(clonedProposal);

        try {
            await missingName.validate();
            assert(false, "Allowed validation of proposal with missing name")
        } catch (err) {
            assert.equal(err.errors.proposalName, "Proposal name required.");
        }
    })
          it("Should NOT allow validation of a proposal with undefined details", async () => {
            let clonedProposal = Object.assign({}, proposalExample);
            clonedProposal.proposalDetails = undefined;
            const missingLanguage = Proposal(clonedProposal);

            try {
              await missingLanguage.validate();
              assert(
                false,
                "Allowed validation of proposal with undefined language."
              );
            } catch (err) {
              assert.equal(
                err.errors.proposalDetails,
                "Proposal details file required."
              );
            }
          });
        it("Should NOT allow validation of a proposal with undefined language", async () => {
          let clonedProposal = Object.assign({}, proposalExample);
          clonedProposal.proposalLanguage = undefined;
          const missingLanguage = Proposal(clonedProposal);

          try {
            await missingLanguage.validate();
            assert(
              false,
              "Allowed validation of proposal with undefined language."
            );
          } catch (err) {
            assert.equal(
              err.errors.proposalLanguage,
              "Proposal language file required."
            );
          }
        });
});
