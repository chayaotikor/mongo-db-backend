const { Schema, model } = require("mongoose");
const autopopulate = require("mongoose-autopopulate");

const judgeSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name of judge required."],
  },
  court: {
    type: String,
    required: [true, "Court that judge serves required."],
  },
  review: {
    type: String,
    required: [true, "Review of judge required."],
  },
});

judgeSchema.plugin(autopopulate);

module.exports = model("Judge", judgeSchema);
