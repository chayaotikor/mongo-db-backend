const { Schema, model } = require("mongoose");
const autopopulate = require("mongoose-autopopulate");

const candidateSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  requestedOffice: {
    type: Schema.Types.ObjectId,
    ref: "Office",
    autopopulate: { select: "title" },
  },
  policyPositions: [
    {
      duty: {
        type: Schema.Types.ObjectId,
        ref: "Office",
        autopopulate: { select: "duties" },
      },
      position: {
        type: String,
        required: true,
      },
    },
  ],
});

candidateSchema.plugin(autopopulate);

module.exports = model("Candidate", candidateSchema);
