const { Schema, model } = require("mongoose");
const Office = require('./officeModel')
const autopopulate = require("mongoose-autopopulate");

const candidateSchema = new Schema({
  name: {
    type: String,
    required: [true, "Candidate name required."],
  },
  requestedOffice: {
    type: Schema.Types.ObjectId,
    ref: "Office",
    autopopulate: { select: "officeTitle" },
    required: [true, "Valid office ID required."],
  },
  policyPositions: {
    type: Buffer,
    required: [true, "Policy positions file required."]
  },
});

candidateSchema.plugin(autopopulate);

module.exports = model("Candidate", candidateSchema);
