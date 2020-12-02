const { Schema, model } = require("mongoose");
const Candidate = require('./candidateModel')
const autopopulate = require("mongoose-autopopulate");

const officeSchema = new Schema({
  officeTitle: {
    type: String,
    required: [true, "Office title required."],
  },
  officeDuties: {
    type: Buffer,
    required: [true, "Office duties file required."],
  },
  candidates: [
    {
      type: Schema.Types.ObjectId,
      ref: Candidate,
      autopopulate: { select: "name" },
      required: false,
    },
  ],
});

officeSchema.plugin(autopopulate);

module.exports = model("Office", officeSchema);
