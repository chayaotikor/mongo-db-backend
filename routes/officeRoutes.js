const express = require("express");
const router = express.Router();
const officeResolver = require("../data/resolvers/officeResolver");
const responseStatus = require("../config/responseStatuses");

router.get("/", async (req, res, next) => {
  try {
    const offices = await officeResolver.getAllOffices();
    res.status(responseStatus.successful).json({ offices });
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const office = await officeResolver.getOffice(id);
    res.status(responseStatus.successful).json({ office });
  } catch (err) {
    if (TypeError) {
      console.log(err);
      next(responseStatus.notFound);
    } else {
      next(err);
    }
  }
});

router.post("/", async (req, res, next) => {
  const { body } = req;
  try {
    const newOfficeDoc = await officeResolver.addOffice(body);
    res.status(responseStatus.postCreated).json({ newOfficeDoc });
  } catch (err) {
    next(err);
  }
});

router.put("/:id", async (req, res, next) => {
  const { id } = req.params;
  const { body } = req;
  try {
    const updatedDoc = await officeResolver.updateOffice(id, body);
    res.status(responseStatus.successful).json({ updatedDoc });
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedRecords = await officeResolver.deleteOffice(id);
    res.status(responseStatus.successful).json({ deletedRecords });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
