const Judge = require("../models/judgeModel");
const errorHandler = require("../../middleware/errorHandler");
const responseStatus = require("../../config/responseStatuses");

module.exports = {
  getAllJudges: async () => {
    try {
      const judges = await Judge.find();

      return judges.map((judge) => {
        return { ...judge._doc };
      });
    } catch (err) {
      errorHandler(err);
    }
  },
  getJudge: async ({ id }) => {
    try {
      const judge = await Judge.findOne({ _id: id });
      if (!judge) {
        errorHandler(responseStatus.notFound);
      }
      return { ...judge._doc };
    } catch (err) {
      errorHandler(err);
    }
  },

  addJudge: async ({ content }) => {
    const judgeContent = new Judge({
      name: content.name,
      court: content.court,
      performanceReview: content.performanceReview,
    });
    try {
      if (
        judgeContent.name === "undefined" ||
        judgeContent.court === "undefined" ||
        judgeContent.performanceReview === "undefined"
      ) {
        errorHandler(responseStatus.badRequest);
      }
      const newJudge = await judgeContent.save();

      return { ...newJudge._doc };
    } catch (err) {
      errorHandler(err);
    }
  },

  updateJudge: async ({ content, id }) => {
    try {
      const judge = await Judge.findOne({ _id: id });
      if (!judge) {
        errorHandler(responseStatus.notFound);
      } else {
          const keys = Object.keys(content);
          for (let i = 0; i < keys.length; i++) {
            let property = keys[i];
            judge[property] = content[property];
          }
        await judge.save();
        return { ...judge._doc };
      }
    } catch (err) {
      errorHandler(err);
    }
  },

  deleteJudge: async ({ judgeId }) => {
    try {
      const judge = await Judge.findOne({ _id: judgeId });
      if (!judge) {
        errorHandler(responseStatus.notFound);
      } else {
        judge.remove();
      }
    } catch (err) {
      errorHandler(err);
    }
  },
};
