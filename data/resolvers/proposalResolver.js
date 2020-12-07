const Proposal = require("../models/proposalModel");
const errorHandler = require("../../middleware/errorHandler");

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
      proposalName: content.proposalName,
      proposalDetails: content.proposalDetails,
      proposalLanguage: content.proposalLanguage
    });
    try {
      if (
        proposalContent.proposalName === "undefined" ||
        proposalContent.proposalDetails === "undefined" ||
        proposalContent.proposalLanguage == "undefined"
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
