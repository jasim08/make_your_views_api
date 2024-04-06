const { DataTypes } = require("sequelize");
const sequelize = require("../dbconnection/dbmyt");


const playerdetails = sequelize.define(
  "PLAYER_DETAILS",
  {
    player_details_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    player_name: {
      type: DataTypes.STRING(255),
    },
    player_pt:{
      type: DataTypes.STRING(200),
    },
    player_cr:{
      type: DataTypes.DECIMAL(10,2)
    },
    team_id: {
      type: DataTypes.INTEGER,
    }
  },
  {
    timestamps: false, // If you don't want Sequelize to manage createdAt and updatedAt fields
    tableName: "PLAYER_DETAILS",
    returning: true, // This enables returning updated data
  }
);



module.exports = playerdetails;
