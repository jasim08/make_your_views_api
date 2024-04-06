const { Op } = require("sequelize");
const mytTeamdb = require("../models/mytTeam");
const mytPlayerDetails = require("../models/mytPlayerDetails");

const mytService = {};

mytService.getPlayersByTeamId = async (team_id) => {
  try {
    
    return await mytPlayerDetails.findAll({
      where: {
        team_id: team_id
      },
    });
  } catch (err) {
    throw new Error(err.message);
  }
};




module.exports = mytService;
