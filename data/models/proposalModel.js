const { Schema, model } = require("mongoose");

const proposalSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name of the proposal required."],
  },

  approvalEffect: {
    type: String,
    required: [true, "Effect of proposal required."],
  },

  details: {
    type: {
      explanation: {
        type: String,
        required: [true, "Explanation of proposal required."],
      },
      analysis: {
        type: String,
        required: [true, "Analysis of proposal required."],
      },
    },
    required: [true, "Details of proposal required."],
  },

  arguments: {
    type: {
      proponentSummary: {
        type: String,
        required: [true, "Proponent summary argument required."],
      },
      proponentDetailed: {
        type: String,
        required: [true, "Proponent detailed argument required."],
      },
      opponentSummary: {
        type: String,
        required: [true, "Opponent summary argument required."],
      },
      opponentDetailed: {
        type: String,
        required: [true, "Opponent summary argument required."],
      },
    },
    required: [true, "For/Against arguments required."],
  },

  language: {
    type: {
      title: {
        type: String,
        required: [true, "Proposal title language required."],
      },
      text: {
        type: String,
        required: [true, "Proposal text language required."],
      },
    },
    required: [true, "Proposal language required."],
  },

  fiscalImpact: {
    type: String,
    required: [true, "Fiscal impact analysis required."],
  },
});

module.exports = model("Proposal", proposalSchema);
