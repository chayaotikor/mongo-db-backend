const { Schema, model } = require("mongoose");
const autopopulate = require("mongoose-autopopulate");

const officeSchema = new Schema({
  title: {
    type: String,
    required: [true, "The title of the office is required."],
  },
  duties: {
    type: [
      {
        type: String,
        required: [true, "Duty description cannot be blank."],
      },
    ],
    required: [true, "A duties list for the office is required."],
  },
  candidates: [
    {
      type: Schema.Types.ObjectId,
      ref: "Candidate",
      autopopulate: { select: "name" },
      required: false,
    },
  ],
});

officeSchema.plugin(autopopulate);

module.exports = model("Office", officeSchema);
