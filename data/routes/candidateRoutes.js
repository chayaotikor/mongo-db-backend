const express = require("express");
const router = express.Router();
const candidateResolvers = require("../resolvers/candidateResolver");
const responseStatus = require("../../config/responseStatuses");

router.get("/", async (req, res, next) => {
  try {
    const candidates = await candidateResolvers.getAllCandidates();
    res.status(responseStatus.success).json({ candidates });
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const candidate = await candidateResolvers.getCandidate(id);
    res.status(responseStatus.success).json({ candidate });
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
    const newCandidateDoc = await candidateResolvers.addCandidate(body);
    res.status(responseStatus.postCreated).json({ newCandidateDoc });
  } catch (err) {
    next(err);
  }
});

router.put("/:id", async (req, res, next) => {
  const { id } = req.params;
  const { body } = req;
  try {
    const updatedRecords = await candidateResolvers.updateCandidate(id, body);
    res.status(responseStatus.success).json({ updatedRecords });
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedRecords = await candidateResolvers.deleteCandidate(id);
    res.status(responseStatus.success).json({ deletedRecords });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
