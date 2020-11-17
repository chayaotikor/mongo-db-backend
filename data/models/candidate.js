const { Schema, model } = require("mongoose");
const autopopulate = require("mongoose-autopopulate");

const positionSchema = new Schema({
  description: {
    type: Schema.Types.ObjectId,
    ref: "Duty",
    autopopulate: true,
    },
    position: {
        type: String,
        required: true
    }
});

const candidateSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  requestedOffice: {
    type: Schema.Types.ObjectId,
    ref: "Office",
    autopopulate: true,
  },
  policyPositions: [
    {
      type: positionSchema,
      required: true,
    },
  ],
});

candidateSchema.plugin(autopopulate);

module.exports = model("Candidate", candidateSchema);