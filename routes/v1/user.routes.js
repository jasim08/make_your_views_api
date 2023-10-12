const express = require("express");
const userController = require("../../controller/user.controller");
const verifyToken = require("../../middleware/verifyToken");
const userRoutes = express.Router();

userRoutes.post("/signup", userController.signUp);
userRoutes.post("/sendotp", userController.sentEmailOTP);
userRoutes.post("/verify", userController.userVerify);
userRoutes.post(
  "/adviewpoints",
  verifyToken.validateToken,
  userController.adviewPointsUpdate
);

userRoutes.post(
  "/subtractviewpoints",
  verifyToken.validateToken,
  userController.subtractviewpointsUpdate
);
userRoutes.get("/:user_id", verifyToken.validateToken, userController.getUser);
userRoutes.get(
  "/otpcheck/:userId",
  verifyToken.validateToken,
  userController.getOTPExpireStatus
);

userRoutes.get("/checkversion/new", userController.checkversiongloabl);

module.exports = userRoutes;
