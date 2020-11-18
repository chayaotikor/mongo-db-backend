const Office = require("../models/officeModel")
const Candidate = require("../models/candidateModel")
const Duty = require("../models/officeModel")

module.exports = {
    addOffice: async ({title, duties, candidates}) => {
        const officeDetails = new Office({
            title: title,
            duties: duties,
            candidates: candidates
        })
        try {
            const newOffice = await officeDetails.save();

            return {...newOffice._doc}
        } catch (error) {
            console.log(error)
        }
    }
}