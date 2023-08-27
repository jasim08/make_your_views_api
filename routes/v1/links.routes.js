const express = require("express");
const linkController = require("../../controller/link.controller");
const verifyToken = require("../../middleware/verifyToken");
const linkRoutes = express.Router();

linkRoutes.post("/share", verifyToken.validateToken, linkController.addNewLink);
linkRoutes.post(
  "/viewed",
  verifyToken.validateToken,
  linkController.linkViewed
);

module.exports = linkRoutes;
