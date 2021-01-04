const express = require("express");
const router = express.Router();
const judgeResolver = require("../data/resolvers/judgeResolver");
const responseStatus = require("../config/responseStatuses");

router.get("/", async (req, res, next) => {
  try {
    const judges = await judgeResolver.getAllJudges();
    res.status(responseStatus.successful).json({ judges });
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const judge = await judgeResolver.getJudge(id);
    res.status(responseStatus.successful).json({ judge });
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
    const newJudgeDoc = await judgeResolver.addJudge(body);
    res.status(responseStatus.postCreated).json({ newJudgeDoc });
  } catch (err) {
    next(err);
  }
});

router.put("/:id", async (req, res, next) => {
  const { id } = req.params;
  const { body } = req;
  try {
    const updatedDoc = await judgeResolver.updateJudge(id, body);
    res.status(responseStatus.successful).json({ updatedDoc });
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedRecords = await judgeResolver.deleteJudge(id);
    res.status(responseStatus.successful).json({ deletedRecords });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
