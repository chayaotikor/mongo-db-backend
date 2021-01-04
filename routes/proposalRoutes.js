const express = require("express");
const router = express.Router();
const proposalResolver = require("../data/resolvers/proposalResolver");
const responseStatus = require("../config/responseStatuses");

router.get("/", async (req, res, next) => {
  try {
    const proposals = await proposalResolver.getAllProposals();
    res.status(responseStatus.successful).json({ proposals });
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const proposal = await proposalResolver.getProposal(id);
    res.status(responseStatus.successful).json({ proposal });
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
    const newProposalDoc = await proposalResolver.addProposal(body);
    res.status(responseStatus.postCreated).json({ newProposalDoc });
  } catch (err) {
    next(err);
  }
});

router.put("/:id", async (req, res, next) => {
  const { id } = req.params;
  const { body } = req;
  try {
    const updatedDoc = await proposalResolver.updateProposal(id, body);
    res.status(responseStatus.successful).json({ updatedDoc });
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedRecords = await proposalResolver.deleteProposal(id);
    res.status(responseStatus.successful).json({ deletedRecords });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
