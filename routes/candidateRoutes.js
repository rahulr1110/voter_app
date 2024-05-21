const express = require("express");
const { jwtAuthMiddleware } = require("../middleware/authMiddleware");
const {
  addCandidateController,
  updateCandidateController,
  deleteCandidateController,
  addVoteController,
  voteCountController,
  getAllCandidateController
} = require("../controller/candidateControllers");

router = express.Router();

router.post("/addcandidate", jwtAuthMiddleware, addCandidateController);
router.put(
  "/updatecandidate/:candidateID",
  jwtAuthMiddleware,
  updateCandidateController
);
router.delete(
  "/deletecandidate/:candidateID",
  jwtAuthMiddleware,
  deleteCandidateController
);
router.post("/addvote/:candidateID", jwtAuthMiddleware, addVoteController);
router.get("/getvotescounts", voteCountController);
router.get("/getallcandidates", getAllCandidateController);

module.exports = router;


