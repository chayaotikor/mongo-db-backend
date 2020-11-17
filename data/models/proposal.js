const { Schema, model } = require("mongoose");
const autopopulate = require("mongoose-autopopulate");

const argumentSchema = new Schema({
  argumentSummary: {
    type: String,
    required: true,
  },
  argumentDetails: {
    type: String,
    required: true,
  },
});

const detailsSchema = new Schema({
  explanation: {
    type: String,
    required: true,
  },
  analysis: {
    type: String,
    required: true,
    },
});

const languageSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    }
})

const proposalSchema = new Schema({
  identfier: {
    type: String,
    required: true,
  },
  approvalResult: {
    type: String,
    required: true,
    },
    details: {
        type: detailsSchema,
        required: true
    },
    arguments: [
        {
            type: argumentSchema,
            required: true,
        }
    ],
    proposalLanguage: {
        type: languageSchema,
        required: true
    },
    fiscalImpact: {
        type: String,
        required: true
    }
});

proposalSchema.plugin(autopopulate);

module.exports = model("Proposal", proposalSchema);