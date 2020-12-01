const Proposal = require("../models/proposalModel");
const errorHandler = require("../../config/errorHandler");

module.exports = {
  getAllProposals: async () => {
    try {
      const proposals = await Proposal.find();

      return proposals.map((proposal) => {
        return { ...proposal._doc };
      });
    } catch (err) {
      errorHandler(err);
    }
  },
  getProposal: async ({ id }) => {
    try {
      const proposal = await Proposal.findOne({ _id: id });
      if (!proposal) {
        errorHandler(responseStatus.notFound);
      }
      return { ...proposal._doc };
    } catch (err) {
      errorHandler(err);
    }
  },

  addProposal: async ({ content }) => {
    const proposalContent = new Proposal({
      name: content.name,
      approvalEffect: content.approvalEffect,
      details: {
        explanation: content.details.explanation,
        analysis: content.details.analysis,
      },
      arguments: {
        proponentSummary: content.arguments.proponentSummary,
        proponentDetailed: content.arguments.proponentDetailed,
        opponentSummary: content.arguments.opponentSummary,
        opponentDetailed: content.arguments.opponentDetailed,
        },
        language: {
            title: content.language.title,
            text: content.language.text
        },
        fiscalImpact: content.fiscalImpact
    });
    try {
      if (
        proposalContent.name === "undefined" ||
        proposalContent.approvalEffect === "undefined" ||
        proposalContent.details.explanation === "undefined" ||
        proposalContent.details.analysis === "undefined" ||
        proposalContent.arguments.proponentSummary === "undefined" ||
        proposalContent.arguments.proponentDetailed === "undefined" ||
        proposalContent.arguments.opponentSummary === "undefined" ||
        proposalContent.arguments.opponentDetailed === "undefined" || 
        proposalContent.language.title === "undefined" || 
        proposalContent.language.text === "undefined" || 
        proposalContent.fiscalImpact === "undefined" 
      ) {
        errorHandler(responseStatus.badRequest);
      }
      const newProposal = await proposalContent.save();

      return { ...newProposal._doc };
    } catch (err) {
      errorHandler(err);
    }
  },

  updateProposal: async ({ content, id }) => {
    try {
      const proposal = await Proposal.findOne({ _id: id });
      if (!proposal) {
        errorHandler(responseStatus.notFound);
      } else {
          const keys = Object.keys(content)
          for (let i = 0; i < keys.length; i++){
              let property = keys[i]
              proposal[property] = content[property];
          }
        await proposal.save();
        return { ...proposal._doc };
      }
    } catch (err) {
      errorHandler(err);
    }
  },

  deleteProposal: async ({ proposalId }) => {
    try {
      const proposal = await Proposal.findOne({ _id: proposalId });
      if (!proposal) {
        errorHandler(responseStatus.notFound);
      } else {
        proposal.remove();
      }
    } catch (err) {
      errorHandler(err);
    }
  },
};
