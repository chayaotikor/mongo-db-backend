const { Schema, model } = require("mongoose");
const autopopulate = require("mongoose-autopopulate");

const dutySchema = new Schema({
    type: String,
    required: true
})

const officeSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    duties: [
        {
            type: dutySchema,
            required: true
        }
    ],
    candidates: [
        {
            type: Schema.Types.ObjectId,
            ref: "Candidate",
            autopopulate: true
        }
    ]
})
officeSchema.plugin(autopopulate);

const officeModel = model("Office", officeSchema);
const dutyModel = model("Duty", dutySchema);
module.exports = { officeModel, dutyModel };


