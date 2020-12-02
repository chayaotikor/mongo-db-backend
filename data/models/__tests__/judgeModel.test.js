// const { assert, expect } = require("chai");
// const Judge = require("../judgeModel");

// describe("Judge Model Tests", () => {
//     //POSITIVE TESTS
//     it("Should save a correctly formatted judge and return the doc", async () => { 
//         const newJudge = Judge({
//             name: "Judge Judy",
//             court: "Eastern District Court of Public Opinion",
//             review: "Judge Judy has met performance standards. She did things."
//         });

//         let result = await newJudge.save()

//         assert.equal(result.name, "Judge Judy")
//         assert.equal(result.court, "Eastern District Court of Public Opinion");
//         assert.equal(
//           result.review,
//           "Judge Judy has met performance standards. She did things."
//         );
//     })
    
//     //NEGATIVE TESTS
//     it('Should NOT allow validation of a judge with an undefined name', async () => {
//          const missingName = Judge({
//            name: "",
//            court: "Eastern District Court of Public Opinion",
//            review: "Judge Judy has met performance standards. She did things.",
//          });
//         try {
//             await missingName.validate()
//             assert(false, "Allowed validation of judge with undefined name")
//         } catch (err) {
//             assert.equal(err.errors.name, "Name of judge required.");
//         }
//     })

//     it('Should NOT allow validation of a judge with an undefined court', async () => {
//          const missingCourt = Judge({
//            name: "Judge Judy",
//            court: "",
//            review: "Judge Judy has met performance standards. She did things.",
//          });
//         try {
//             await missingCourt.validate()
//             assert(false, "Allowed validation of judge with undefined court")
//         } catch (err) {
//             assert.equal(err.errors.court, "Court that judge serves required.");
//         }
//     })

//     it('Should NOT allow validation of a judge with an undefined review', async () => {
//          const missingReview = Judge({
//            name: "Judge Judy",
//            court: "Eastern District Court of Public Opinion",
//            review: "",
//          });
//         try {
//             await missingReview.validate()
//             assert(false, "Allowed validation of judge with undefined review")
//         } catch (err) {
//             assert.equal(err.errors.review, "Review of judge required.");
//         }
//     })

// })