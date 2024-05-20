const express = require("express");
const { jwtAuthMiddleware } = require("../middleware/authMiddleware");
const {
  userSignupController,
  userLoginController,
  userProfileController,
  userPasswordChangeController,
} = require("../controller/userController");
router = express.Router();

router.post("/signup", userSignupController);
router.post("/login", userLoginController);
router.get("/userprofile", jwtAuthMiddleware, userProfileController);
router.put(
  "/userpasswordchange",
  jwtAuthMiddleware,
  userPasswordChangeController
);

module.exports = router;
