const { Schema, model } = require("mongoose");
const autopopulate = require("mongoose-autopopulate");

const candidateSchema = new Schema({
  name: {
    type: String,
    required: [true, "Candidate name required."],
  },
  requestedOffice: {
    type: Schema.Types.ObjectId,
    ref: 'Office',
    autopopulate: { select: "officeTitle" },
    required: [true, "Valid office ID required."],
  },
  candidateQuestionnaire: {
    type: Buffer,
    required: [true, "Candidate questionnaire file required."]
  },
});

candidateSchema.plugin(autopopulate);

module.exports = model("Candidate", candidateSchema);
