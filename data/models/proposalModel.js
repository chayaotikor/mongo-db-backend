const { Schema, model } = require("mongoose");

const proposalSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name of the proposal required."],
  },

  details: {
    type: Buffer,
    required: [true, "Details of the proposal required."],
  },
});

module.exports = model("Proposal", proposalSchema);
