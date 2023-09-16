const express = require("express");
const userController = require("../../controller/user.controller");
const verifyToken = require("../../middleware/verifyToken");
const userRoutes = express.Router();

userRoutes.post("/signup", userController.signUp);
userRoutes.post("/sendotp", userController.sentEmailOTP);
userRoutes.post("/verify", userController.userVerify);
userRoutes.get("/:user_id", verifyToken.validateToken, userController.getUser);

module.exports = userRoutes;
