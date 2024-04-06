
const mytTeamService = require("../service/mytTeam.service");
const { encrypt } = require("../utils");
const { v4: uuidv4 } = require("uuid");
const getPagingData = require("../utils/pagination");

const mytController = {}

mytController.getTeamListByName = (req, res)=>{
   try{
      const {team_id} = req.params;
      
      const result = mytTeamService.getPlayersByTeamId(team_id)
      res.send(result).status(200)
   }catch(err){
    console.log(err.message)
    res.send(err.message).status(500)
   }
}


module.exports = mytController;
