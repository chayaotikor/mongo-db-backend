const { buildSchema } = require("graphql");

module.exports = buildSchema(`
type Duty {
    _id: ID!
    description: String!
}
type Office {
    _id: ID!
    title: String!
    duties: [Duty!]!
    candidates: [Candidate!]!
}

type Position {
    _id: ID!
    description: Duty!
    positionDetails: String!
}

type Candidate {
    _id: ID!
    name: String!
    requestedOffice: Office!
    policyPositions: [Position!]!
}

type Review {
    _id: ID!
    metStandard: Boolean!
    reviewText: String!
}

type Judge {
    _id: ID!
    name: String!
    court: String!
    review: Review!
}

type ProposalArgument {
    _id: ID!
    proponent: Boolean!
    argumentSummary: String!
    argumentDetails: String!
}

type ProposalDetails {
    _id: ID!
    explanation: String!
    analysis: String!
}

type ProposalLanguage {
    _id: ID!
    title: String!
    text: String!
}

type Proposal {
    _id: ID!
    name: String!
    approvalResult: String!
    details: ProposalDetails!
    arguments: [ProposalArguments!]!
    language: ProposalLanguage!
    fiscalImpact: String!
}
`);