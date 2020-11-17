const { Schema, model } = require("mongoose");
const autopopulate = require("mongoose-autopopulate");

module.exports = {
  Duty: model(
    "Duty",
    new Schema({
      description: {
        type: String,
        required: true,
      },
    })
  ),
  Office: model(
    "Office",
    new Schema({
      title: {
        type: String,
        required: true,
      },
      duties: [
        {
          type: dutySchema,
          required: true,
        },
      ],
      candidates: [
        {
          type: Schema.Types.ObjectId,
          ref: "Candidate",
          autopopulate: true,
        },
      ],
    })
  ),
};

this.Office.plugin(autopopulate);
