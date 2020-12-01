const Office = require("../models/officeModel")
const errorHandler = require("../../config/errorHandler")

module.exports = {
  getAllOffices: async () => {
    try {
      const offices = await Office.find();

      return offices.map((office) => {
        return { ...office._doc };
      });
    } catch (err) {
      errorHandler(err);
    }
  },
  getOffice: async ({ id }) => {
    try {
      const office = await Office.findOne({ _id: id });
      if (!office) {
        errorHandler(responseStatus.notFound);
      }
      return { ...office._doc };
    } catch (err) {
      errorHandler(err);
    }
  },

  addOffice: async ({ content }) => {
    const officeContent = new Office({
      title: content.title,
      duties: content.duties,
      candidates: [],
    });
    try {
      if (
        officeContent.title === "undefined" ||
        officeContent.duties === "undefined"
      ) {
        errorHandler(responseStatus.badRequest);
      }
      const newOffice = await officeContent.save();

      return { ...newOffice._doc };
    } catch (err) {
      errorHandler(err);
    }
  },

  updateOffice: async ({ content, id }) => {
    try {
      const office = await Office.findOne({ _id: id });
      if (!office) {
        errorHandler(responseStatus.notFound);
      } else {
        if (content.title) {
          office.title = content.title;
        }
        if (content.duties) {
          office.duties = content.duties;
        }
        if (content.candidates) {
          office.candidates = content.candidates;
        }
        await office.save();
        return { ...office._doc };
      }
    } catch (err) {
      errorHandler(err);
    }
  },

  deleteOffice: async ({ officeId }) => {
    try {
      const office = await Office.findOne({ _id: officeId });
      if (!office) {
        errorHandler(responseStatus.notFound);
      } else {
        office.remove();
      }
    } catch (err) {
      errorHandler(err);
    }
  },
};