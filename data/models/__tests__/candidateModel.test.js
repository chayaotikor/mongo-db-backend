const { assert, expect } = require("chai");
const Office = require("../officeModel");
const Candidate = require("../candidateModel");



describe("Candidate Model Tests", () => {
    let officeId;
    before((done) => {
      const office = Office({
        title: "State Representative",
        duties: [
          "Imporant things",
          "More important things",
          "Very very important things",
        ],
        candidates: [],
      });
      office.save().then((res) => {
        officeId = res._id;
        done();
    });
    });
    //POSITIVE TESTS
    it("Should save a correctly formatted candidate and return the doc", async () => {
    const newCandidate = Candidate({
      name: "Joe Schmoe",
      requestedOffice: officeId,
      policyPositions: [
        { dutyIndex: 0, position: "I will do this very well" },
        { dutyIndex: 1, position: "I will also do this thing well" },
        { dutyIndex: 2, position: "This one I will do the best" },
      ],
    });
    try {
        let result = await newCandidate.save();
      assert.equal(result.name, "Joe Schmoe");
      assert.equal(result.requestedOffice.title, "State Representative");
      assert.equal(result.policyPositions[0].position, "I will do this very well");
      assert.equal(result.policyPositions[1].position, "I will also do this thing well");
      assert.equal(result.policyPositions[2].position, "This one I will do the best");
    } catch (error) {
      assert(false, error.message);
    }
    });
    
    //NEGATIVE TESTS
    it("Should NOT allow validation of candidates with undefined names", async () => {
         const missingName = Candidate({
           name: "",
           requestedOffice: officeId,
           policyPositions: [
             { dutyIndex: 0, position: "I will do this very well" },
             { dutyIndex: 1, position: "I will also do this thing well" },
             { dutyIndex: 2, position: "This one I will do the best" },
           ],
         });
        try {
            await missingName.validate()
            assert(false, "Allowed validation of candidate with empty name string")
        } catch (err) {
            assert.equal(err.errors.name, "Name of candidate required.");
        }
    })
    it("Should NOT allow validation of a candidate with an undefined office ID", async () => {

                 const invalidOffice = Candidate({
                   name: "John Doe",
                   requestedOffice: undefined,
                   policyPositions: [
                     { dutyIndex: 0, position: "I will do this very well" },
                     {
                       dutyIndex: 1,
                       position: "I will also do this thing well",
                     },
                     { dutyIndex: 2, position: "This one I will do the best" },
                   ],
                 });
        try {
            await invalidOffice.validate()
            
            assert(false, "Allowed validation of an undefined office ID.")
        } catch (err) {
            assert.equal(err.errors.requestedOffice, "Provided office ID is invalid.")
        }
    })
    it("Should NOT allow validation of a candidate with an office ID that does not exist", async () => {

                 const invalidOffice = Candidate({
                   name: "Jane Doe",
                   requestedOffice: "12fh2",
                   policyPositions: [
                     { dutyIndex: 0, position: "I will do this very well" },
                     {
                       dutyIndex: 1,
                       position: "I will also do this thing well",
                     },
                     { dutyIndex: 2, position: "This one I will do the best" },
                   ],
                 });
        try {
            await invalidOffice.validate()
            
            assert(false, "Allowed validation of an undefined office ID.")
        } catch (err) {
            assert.equal(err.errors.requestedOffice, "CastError: Cast to ObjectId failed for value \"12fh2\" at path \"requestedOffice\"")
        }
    })
    it('Should NOT allow validation of a candidate without a policy position array', async () => {
        const emptyPolicyPositions = Candidate({
          name: "Jane Doe",
          requestedOffice: officeId,
          policyPositions: null,
        });

        try {
            await emptyPolicyPositions.validate()
            assert(false, "Allowed validation of a candidate with an empty policy position list.")
        } catch (err) {
            assert.equal(
              err.errors.policyPositions,
              "Policy positions list required."
            );
        }
    })
    it('Should NOT allow validation of a candidate whose policy positions list contains undefined duty indexes', async () => {
                const missingDutyIndex = Candidate({
                  name: "Jane Doe",
                  requestedOffice: officeId,
                  policyPositions: [
                    {
                      dutyIndex: 0,
                      position:
                        "I would be awesome at this because reasons.",
                    },
                    {
                      dutyIndex: undefined,
                      position:
                        "I would do this duty the best anyone ever has!",
                    },
                  ],
                });
        
        try {
            await missingDutyIndex.validate()
            assert(false, "Allowed validation of a candidate with undefined duty indexes")
        } catch (err) {
            assert.equal(
              err.errors["policyPositions.1.dutyIndex"],
              "Index of the duty required."
            );
        }
    })
    it('Should NOT allow validation of a candidate whose policy positions list contains undefined positions', async () => {
                const missingDutyIndex = Candidate({
                  name: "Jill Doe",
                  requestedOffice: officeId,
                  policyPositions: [
                    {
                      dutyIndex: 0,
                      position:
                        "",
                    },
                    {
                      dutyIndex: 1,
                      position:
                        "I would do this duty the best anyone ever has!",
                    },
                  ],
                });
        
        try {
            await missingDutyIndex.validate()
            assert(false, "Allowed validation of a candidate with undefined policy positions")
        } catch (err) {
            assert.equal(
              err.errors["policyPositions.0.position"],
              "Policy position on a specified duty required."
            );
        }
    })

});
