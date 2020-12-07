const Candidate = require("../models/candidateModel");
const Office = require("../models/officeModel");
const errorHandler = require("../../middleware/errorHandler");
const responseStatus = require("../../config/responseStatuses");

module.exports = {
  getAllCandidates: async () => {
    try {
      const candidates = await Candidate.find();

      return candidates.map((candidate) => {
        return { ...candidate._doc };
      });
    } catch (err) {
      errorHandler(err);
    }
  },
  getCandidate: async (id) => {
    try {
      const candidate = await Candidate.findOne({ _id: id });
      if (!candidate) {
        errorHandler(responseStatus.notFound);
      }
      return { ...candidate._doc };
    } catch (err) {
      errorHandler(err);
    }
  },

  addCandidate: async (content, officeId) => {
    const candidateContent = new Candidate({
      name: content.name,
      candidateQuestionnaire: content.candidateQuestionnaire,
      requestedOffice: officeId,
    });
    try {
      if (
        candidateContent.name === "undefined" ||
        candidateContent.candidateQuestionnaire === "undefined" ||
        officeId === "undefined"
      ) {
        errorHandler(responseStatus.badRequest);
      }
      const newCandidate = await candidateContent.save();
      const office = await Office.findById(officeId);
      if (!office) {
        errorHandler(responseStatus.notFound);
      }
      office.candidates.push(newCandidate);
      await office.save();

      return { ...newCandidate._doc };
    } catch (err) {
      errorHandler(err);
    }
  },

  updateCandidate: async (content, id) => {
    try {
      const candidate = await Candidate.findOne({ _id: id });
      if (!candidate) {
        errorHandler(responseStatus.notFound);
      } else {
        const keys = Object.keys(content);
        for (let i = 0; i < keys.length; i++) {
          let property = keys[i];
          candidate[property] = content[property];
        }
        await candidate.save();
        return { ...candidate._doc };
      }
    } catch (err) {
      errorHandler(err);
    }
  },

  deleteCandidate: async (candidateId, officeId) => {
    try {
      const candidate = await Candidate.deleteOne({ _id: candidateId });
      const office = await Office.findById(officeId);

      if (candidate.deletedCount !== 1) {
        errorHandler(responseStatus.notFound);
      } else if (!office) {
        errorHandler(responseStatus.notFound);
      } else {
        office.candidates = office.candidates.filter((candidate) => {
          return candidate._id !== candidateId;
        });
        await office.save();
        return { office, candidate };
      }
    } catch (err) {
      errorHandler(err);
    }
  },
};
