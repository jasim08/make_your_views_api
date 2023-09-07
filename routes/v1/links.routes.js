const express = require("express");
const linkController = require("../../controller/link.controller");
const verifyToken = require("../../middleware/verifyToken");
const linkRoutes = express.Router();

linkRoutes.get("/", verifyToken.validateToken, linkController.getRandomLinks);

linkRoutes.post("/share", verifyToken.validateToken, linkController.addNewLink);
linkRoutes.post(
  "/viewed",
  verifyToken.validateToken,
  linkController.linkViewed
);

linkRoutes.get("/mine", verifyToken.validateToken, linkController.getmyLinks);

module.exports = linkRoutes;
