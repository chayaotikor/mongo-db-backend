const { Schema, model } = require("mongoose");
const autopopulate = require("mongoose-autopopulate");

module.exports = {
  Position: model(
    "Position",
    new Schema({
      description: {
        type: Schema.Types.ObjectId,
        ref: "Duty",
        autopopulate: true,
      },
      positionDetails: {
        type: String,
        required: true,
      },
    })
  ),
  Candidate: model(
    "Candidate",
    new Schema({
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
    })
  ),
};

this.Candidate.plugin(autopopulate);
