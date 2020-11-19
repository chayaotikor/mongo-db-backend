const { assert, expect } = require("chai");
const Proposal = require("../proposalModel");

let proposalExample = {
  name: "AA",
  approvalEffect: "If voters approve proposal AA, good things will happen.",
  details: {
    explanation:
      "Proposal AA seeks to make things happen by fixing that other thing that happened.",
    analysis: "Here is an analysis of the potential effects of Proposal AA.",
  },
  arguments: {
    proponentSummary: "Proposal AA is great!",
    proponentDetailed:
      "Here is all the great things proposal AA will do if passed.",
    opponentSummary: "Proposal AA is not good.",
    opponentDetailed:
      "Proposal AA will lead to a very bad thing. It will also not fix the first bad thing.",
  },
  language: {
    title: "Here is the title language of the proposal.",
    text: "Here is the text language of the proposal.",
  },
  fiscalImpact: "Proposal AA will have no fiscal impact.",
};

describe("Proposal Model Tests", () => {
  //POSITIVE TESTS
  it("Should save a correctly formatted proposal and return the doc", async () => {
    const newProposal = Proposal(proposalExample);

    let result = await newProposal.save();

    assert.equal(result.name, "AA");
    assert.equal(
      result.approvalEffect,
      "If voters approve proposal AA, good things will happen."
    );
    assert.equal(
      result.details.explanation,
      "Proposal AA seeks to make things happen by fixing that other thing that happened."
    );
    assert.equal(
      result.details.analysis,
      "Here is an analysis of the potential effects of Proposal AA."
    );
    assert.equal(result.arguments.proponentSummary, "Proposal AA is great!");
    assert.equal(
      result.arguments.proponentDetailed,
      "Here is all the great things proposal AA will do if passed."
    );
    assert.equal(result.arguments.opponentSummary, "Proposal AA is not good.");
    assert.equal(
      result.arguments.opponentDetailed,
      "Proposal AA will lead to a very bad thing. It will also not fix the first bad thing."
    );
    assert.equal(
      result.language.title,
      "Here is the title language of the proposal."
    );
    assert.equal(
      result.language.text,
      "Here is the text language of the proposal."
    );
    assert.equal(
      result.fiscalImpact,
      "Proposal AA will have no fiscal impact."
    );
  });
    
  //NEGATIVE
    it("Should NOT allow validation of a proposal with an undefined name", async () => {
        let clonedProposal = Object.assign({}, proposalExample);
        clonedProposal.name = undefined
        
      const missingName = Proposal(clonedProposal);
        
        try {
            await missingName.validate();
            assert(false, "Allowed validation of proposal with missing name")
        } catch (err) {
            assert.equal(err.errors.name, "Name of the proposal required.");
        }
  })  
    it("Should NOT allow validation of a proposal with an undefined approval effect", async () => {
        let clonedProposal = Object.assign({}, proposalExample);
        clonedProposal.approvalEffect = undefined
      const missingEffect = Proposal(clonedProposal);
        
        try {
            await missingEffect.validate();
            assert(false, "Allowed validation of proposal with undefined approval effect")
        } catch (err) {
            assert.equal(err.errors.approvalEffect, "Effect of proposal required.");
        }
  })  
    it("Should NOT allow validation of a proposal with undefined details", async () => {
        let clonedProposal = Object.assign({}, proposalExample);
        clonedProposal.details = undefined;
        const missingDetails = Proposal(clonedProposal);
        
        try {
            await missingDetails.validate();
            assert(false, "Allowed validation of proposal with undefined details.")
        } catch (err) {
            assert.equal(err.errors.details, "Details of proposal required.");
        }
  })  
        it("Should NOT allow validation of a proposal with undefined arguments", async () => {
          let clonedProposal = Object.assign({}, proposalExample);
          clonedProposal.arguments = undefined;
          const missingArguments = Proposal(clonedProposal);

          try {
            await missingArguments.validate();
            assert(
              false,
              "Allowed validation of proposal with undefined arguments."
            );
          } catch (err) {
            assert.equal(
              err.errors.arguments,
              "For/Against arguments required."
            );
          }
        });  
    
        it("Should NOT allow validation of a proposal with undefined language", async () => {
          let clonedProposal = Object.assign({}, proposalExample);
          clonedProposal.language = undefined;
          const missingLanguage = Proposal(clonedProposal);

          try {
            await missingLanguage.validate();
            assert(
              false,
              "Allowed validation of proposal with undefined language."
            );
          } catch (err) {
            assert.equal(err.errors.language, "Proposal language required.");
          }
        });  
        it("Should NOT allow validation of a proposal with undefined fiscal impact", async () => {
          let clonedProposal = Object.assign({}, proposalExample);
          clonedProposal.fiscalImpact = undefined;
          const missingImpact = Proposal(clonedProposal);

          try {
            await missingImpact.validate();
            assert(
              false,
              "Allowed validation of proposal with undefined fiscalImpact."
            );
          } catch (err) {
            assert.equal(
              err.errors.fiscalImpact,
              "Fiscal impact analysis required."
            );
          }
        });  

    
});
