const { DataTypes } = require("sequelize");
const sequelize = require("../dbconnection/dbmyt");

const Teams = sequelize.define(
  "TEAMS",
  {
    team_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    team_name: {
      type: DataTypes.STRING(50),
    },
    team_fullname:{
      type: DataTypes.STRING(200),
    },
    player_details_ids: {
      type: DataTypes.STRING(200),
    }
  },
  {
    timestamps: false, // If you don't want Sequelize to manage createdAt and updatedAt fields
    tableName: "TEAMS",
    returning: true, // This enables returning updated data
  }
);

Teams.associate = (models) => {
  Teams.hasMany(models.PLAYER_DETAILS, {
    foreignKey: "team_id",
  });
  
};

module.exports = Teams;
