const { Schema, model } = require("mongoose");

module.exports = {
  ProposalArgument: model(
    "ProposalArgument",
    new Schema({
      proponent: {
        type: Boolean,
        required: true,
      },
      argumentSummary: {
        type: String,
        required: true,
      },
      argumentDetails: {
        type: String,
        required: true,
      },
    })
  ),
  ProposalDetails: model(
    "ProposalDetails",
    new Schema({
      explanation: {
        type: String,
        required: true,
      },
      analysis: {
        type: String,
        required: true,
      },
    })
  ),
  ProposalLanguage: model(
    "ProposalLanguage",
    new Schema({
      title: {
        type: String,
        required: true,
      },
      text: {
        type: String,
        required: true,
      },
    })
  ),
  Proposal: model(
    "Proposal",
    new Schema({
      name: {
        type: String,
        required: true,
      },
      approvalResult: {
        type: String,
        required: true,
      },
      details: {
        type: detailsSchema,
        required: true,
      },
      arguments: [
        {
          type: argumentSchema,
          required: true,
        },
      ],
      language: {
        type: languageSchema,
        required: true,
      },
      fiscalImpact: {
        type: String,
        required: true,
      },
    })
  ),
};
