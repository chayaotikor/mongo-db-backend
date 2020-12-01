const Judge = require("../models/judgeModel");
const errorHandler = require("../../config/errorHandler");
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
      review: content.review,
    });
    try {
      if (
        judgeContent.name === "undefined" ||
        judgeContent.court === "undefined" ||
        judgeContent.review === "undefined"
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
        if (content.name) {
          judge.name = content.name;
        }
        if (content.court) {
          judge.court = content.court;
        }
        if (content.review) {
          judge.review = content.review;
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
