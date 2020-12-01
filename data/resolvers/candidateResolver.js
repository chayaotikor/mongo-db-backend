const Candidate = require("../models/candidateModel");
const Office = require("../models/officeModel");
const errorHandler = require("../../config/errorHandler");
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
  getCandidate: async ({ id }) => {
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

  addCandidate: async ({ content, officeId }, req) => {
    const candidateContent = new Candidate({
      name: content.name,
      policyPositions: content.policyPositions,
      requestedOffice: officeId,
    });
    try {
      if (
        candidateContent.name === "undefined" ||
          candidateContent.policyPositions === "undefined" ||
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

  updateCandidate: async ({ content, id }) => {
    try {
      const candidate = await Candidate.findOne({ _id: id });
      if (!candidate) {
        errorHandler(responseStatus.notFound);
      } else {
        if (content.name) {
          candidate.name = content.name;
        }
        if (content.policyPositions) {
          candidate.policyPositions = content.policyPositions;
        }
        await candidate.save();
        return { ...candidate._doc };
      }
    } catch (err) {
      errorHandler(err);
    }
  },

  deleteCandidate: async ({ candidateId, officeId }) => {
    try {
      const candidate = await Candidate.findOne({ _id: candidateId });
      const office = await Office.findById(officeId);

      if (!candidate) {
        errorHandler(responseStatus.notFound);
      } else if (!office) {
        errorHandler(responseStatus.notFound);
      } else {
        candidate.remove();
        await office.save();
        return { ...office._doc };
      }
    } catch (err) {
      errorHandler(err);
    }
  },
};
