// const {assert, expect} = require("chai");
// const mongoose = require("mongoose");
// const Office = require("../officeModel");




// describe("Office Model Tests", () => {

//   //POSITIVE TESTS
//   it("Should save a correctly formatted office and return the saved doc", async () => {
//     const newOffice = Office({
//       title: "Senator",
//       duties: ["do things", "do other things", "do something at least"],
//       candidates: [],
//     });
//     try {
//       let result = await newOffice.save();

//       assert.equal(result.title, "Senator");
//       assert.equal(result.duties[0], "do things");
//       assert.equal(result.duties[1], "do other things");
//       assert.equal(result.duties[2], "do something at least");
//     } catch (error) {
//       console.log(error);
//       assert(false, "Error saving doc to database.");
//     }
//   });
  
// //NEGATIVE TESTS
// it("Should NOT allow validation of offices with undefined title", async () => {
//   const missingTitle = Office({
//     title: "",
//     duties: ["do things", "do other things", "do something at least"],
//     candidates: [],
//   });
//   try {
//     await missingTitle.validate()
//     assert(false, "Empty office title accepted.");
//   } catch (err) {
//     assert.equal(err.errors.title, "The title of the office is required.");
//   }
// });
   
// it("Should NOT allow validation of office without duty array", async () => {
//   const missingDuties = Office({
//     title: "Comptroller",
//     duties: null,
//     candidates: [],
//   });
//   try {
//     await missingDuties.validate();
//     assert(false, "Empty duties list accepted.");
//   } catch (err) {
//     assert.equal(
//       err.errors.duties,
//       "A duties list for the office is required."
//     );
//   }
// });

//   it("Should NOT allow validation of duties array with empty strings", async () => {
//       const emptyStringDuties = Office({
//         title: "Comptroller",
//         duties: ["Do stuff", "", "One was empty"],
//         candidates: [],
//       });
//     try {
//       await emptyStringDuties.validate()
//       assert(false, "Duties list with empty strings accepted.");
//     } catch (err) {
//       assert.equal(err.errors["duties.1"], "Duty description cannot be blank.");
//     }
//   })
  
// })
