// const { assert, expect } = require("chai");
// const candidateResolver = require("../candidateResolver");
// const mongoose = require("mongoose");
// const Office = require("../../models/officeModel");
// const fs = require("fs");
// const path = require("path");
// const crypto = require("crypto");

// describe("Testing candidate collection resolvers", () => {
//   const candidateExample = {
//     name: "Joe Schmoe",
//     requestedOffice: null,
//     candidateQuestionnaire: fs.readFileSync(
//       path.resolve(__dirname, "../../../pdfs/example__questionnaire_1.pdf")
//     ),
//   };
//   let officeId;
//   let candidateId;
//   before((done) => {
//     const office = Office({
//       officeTitle: "Senator",
//       officeDuties: fs.readFileSync(
//         path.resolve(__dirname, "../../../pdfs/state_senator_duties.pdf")
//       ),
//       candidates: [],
//     });
//     office.save().then((res) => {
//       officeId = res._id;
//       done();
//     });
//   });
//   after((done) => {
//     mongoose.connection.collections["candidates"].drop((err) => {
//       if (err) console.log(err);
//       done();
//     });
//   });
//   it("Should add a candidate to the collection and return the doc", async () => {
//     try {
//       const result = await candidateResolver.addCandidate(
//         candidateExample,
//         officeId
//       );
//       candidateId = result._id;
//       assert.equal(result.name, "Joe Schmoe");
//       assert.equal(result.requestedOffice.officeTitle, "Senator");
//     } catch (error) {
//       assert(false, error.message);
//     }
//   });
//   it("Should return the doc of the requested candidate", async () => {
//     try {
//       const result = await candidateResolver.getCandidate(candidateId);
//       assert.equal(result.name, "Joe Schmoe");
//       assert.equal(result.requestedOffice.officeTitle, "Senator");
//     } catch (error) {
//       assert(false, error.message);
//     }
//   });
//   it("Should update the doc of the specified candidate", async () => {
//     try {
//       const updatedCandidate = {
//         name: "John Schmoe",
//       };
//       const result = await candidateResolver.updateCandidate(
//         updatedCandidate,
//         candidateId
//       );
//       assert.equal(result.name, "John Schmoe");
//       assert.equal(result.requestedOffice.officeTitle, "Senator");
//     } catch (error) {
//       assert(false, error.message);
//     }
//   });
//   it("Should return the docs of all candidates", async () => {
//     try {
//       const candidateExample2 = {
//         name: "Jill Schmoe",
//         requestedOffice: null,
//         candidateQuestionnaire: fs.readFileSync(
//           path.resolve(__dirname, "../../../pdfs/example__questionnaire_2.pdf")
//         ),
//       };
//       await candidateResolver.addCandidate(candidateExample2, officeId);

//       let result = await candidateResolver.getAllCandidates();

//       assert.equal(result.length, 2);
//       assert.equal(result[0].name, "John Schmoe");
//       assert.equal(result[1].name, "Jill Schmoe");
//     } catch (error) {
//       assert(false, error.message);
//     }
//   });
//   it("Should delete the doc of the specified candidate and return the doc of the requested office", async () => {
//     try {
//       const result = await candidateResolver.deleteCandidate(
//         candidateId,
//         officeId
//       );

//       assert.equal(result.candidates.length, 1);

//       assert.equal(result._id.toString(), officeId.toString());
//     } catch (error) {
//       assert(false, error.message);
//     }
//   });
// });
