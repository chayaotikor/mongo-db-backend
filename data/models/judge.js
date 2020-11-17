const { Schema, model } = require("mongoose");
const autopopulate = require("mongoose-autopopulate");

const reviewSchema = new Schema({
    metStandard: {
        type: Boolean,
        required: true
    },
    reviewText: {
        type: String,
        required: true
    }
})

const judgeSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    court: {
        type: String,
        required: true
    },
    review: {
        type: reviewSchema,
        required: true
    }


});

judgeSchema.plugin(autopopulate);

module.exports = model("Judge", judgeSchema);