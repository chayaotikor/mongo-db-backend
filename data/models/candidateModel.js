const { Schema, model } = require("mongoose");
const autopopulate = require("mongoose-autopopulate");

const candidateSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name of candidate required."],
  },
  requestedOffice: {
    type: Schema.Types.ObjectId,
    ref: "Office",
    autopopulate: { select: "title" },
    required: [true, "Provided office ID is invalid."]
  },
  policyPositions:{
    type: Buffer,
  required: [true, "Policy positions list required."]
  }
});

candidateSchema.plugin(autopopulate);

module.exports = model("Candidate", candidateSchema);
