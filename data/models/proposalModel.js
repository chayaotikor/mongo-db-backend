const { Schema, model } = require("mongoose");

const proposalSchema = new Schema({
  proposalName: {
    type: String,
    required: [true, "Proposal name required."],
  },

  proposalDetails: {
    type: Buffer,
    required: [true, "Proposal details file required."],
  },

  proposalLanguage: {
        type: Buffer,
    required: [true, "Proposal language file required."],
  }
});

module.exports = model("Proposal", proposalSchema);
