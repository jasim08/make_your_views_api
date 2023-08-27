const express = require("express");
const userController = require("../../controller/user.controller");
const userRoutes = express.Router();

userRoutes.post("/signup", userController.signUp);
userRoutes.post("/sendotp", userController.sentEmailOTP);
userRoutes.post("/verify", userController.userVerify);

module.exports = userRoutes;
