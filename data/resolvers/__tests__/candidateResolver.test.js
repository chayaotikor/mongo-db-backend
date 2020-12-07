const { assert, expect } = require("chai");
const candidateResolver = require('../candidateResolver')
const Office = require("../../models/officeModel");

const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

describe('Testing candidate collection resolvers', () => {
      const candidateExample = {
        name: "Joe Schmoe",
        requestedOffice: null,
        candidateQuestionnaire: fs.readFileSync(
          path.resolve(__dirname, "../../../pdfs/example__questionnaire_1.pdf")
        ),
    };
    let officeId;
      before((done) => {
        const office = Office({
          officeTitle: "Senator",
          officeDuties: fs.readFileSync(
            path.resolve(__dirname, "../../../pdfs/state_senator_duties.pdf")
          ),
          candidates: [],
        });
        office.save().then((res) => {
          officeId = res._id;
          done();
        });
      });
    it('Should add a candidate to the collection and return the doc', async (done) => {
        const result = await candidateResolver.addCandidate(candidateExample, officeId)
        console.log(result)

    })
})