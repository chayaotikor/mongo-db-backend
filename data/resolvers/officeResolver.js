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
      officeTitle: content.officeTitle,
      officeDuties: content.officeDuties,
      candidates: [],
    });
    try {
      if (
        officeContent.officeTitle === "undefined" ||
        officeContent.officeDuties === "undefined"
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
          const keys = Object.keys(content);
          for (let i = 0; i < keys.length; i++) {
            let property = keys[i];
            office[property] = content[property];
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