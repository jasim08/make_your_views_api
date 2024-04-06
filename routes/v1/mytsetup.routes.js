const express = require("express");
const mytController = require("../../controller/myt.controller");

const mytRoutes = express.Router();


mytRoutes.get("/team/:team_id", mytController.getTeamListByName);


module.exports = mytRoutes;
