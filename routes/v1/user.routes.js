const express = require("express");
const userController = require("../../controller/user.controller");
const userRoutes = express.Router();

userRoutes.post("/signup", userController.signUp);
userRoutes.post("/sent/email/otp", userController.signUp);
userRoutes.post("/signup", userController.signUp);

module.exports = userRoutes;
