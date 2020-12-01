const candidateResolver = require('./candidateResolver')
const judgeResolver = require('./judgeResolver')
const officeResolver = require('./officeResolver')
const proposalResolver = require('./proposalResolver')

const rootResolver = {
  ...candidateResolver,
  ...judgeResolver,
  ...officeResolver,
  ...proposalResolver,
};

module.exports = { rootResolver };
