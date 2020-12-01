const { Schema, model } = require("mongoose");
const autopopulate = require("mongoose-autopopulate");

const candidateSchema = new Schema({
  name: {
    type: String,
    required: [true, "Candidate name required."],
  },
  requestedOffice: {
    type: Schema.Types.ObjectId,
    ref: "Office",
    autopopulate: { select: "title" },
    required: [true, "Valid office ID required."]
  },
  policyPositions:{
    type: Buffer,
  required: [true, "Policy positions file required."]
  }
});

candidateSchema.plugin(autopopulate);

module.exports = model("Candidate", candidateSchema);
