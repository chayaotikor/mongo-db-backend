const { Schema, model } = require("mongoose");
const autopopulate = require("mongoose-autopopulate");

const judgeSchema = new Schema({
  name: {
    type: String,
    required: [true, "Judge name required."],
  },
  court: {
    type: String,
    required: [true, "Court served required."],
  },
  performanceReview: {
    type: Buffer,
    required: [true, "Judge review file required."],
  },
});

judgeSchema.plugin(autopopulate);

module.exports = model("Judge", judgeSchema);
