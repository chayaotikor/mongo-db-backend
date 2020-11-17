const { Schema, model } = require("mongoose");
const autopopulate = require("mongoose-autopopulate");

module.exports = {
  Review: model(
    "Review",
    new Schema({
      metStandard: {
        type: Boolean,
        required: true,
      },
      reviewText: {
        type: String,
        required: true,
      },
    })
  ),
  Judge: model(
    "Judge",
    new Schema({
      name: {
        type: String,
        required: true,
      },
      court: {
        type: String,
        required: true,
      },
      review: {
        type: reviewSchema,
        required: true,
      },
    })
  ),
};

this.Judge.plugin(autopopulate);
