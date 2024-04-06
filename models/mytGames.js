const { DataTypes } = require("sequelize");
const sequelize = require("../dbconnection/dbmyt");


const games = sequelize.define(
  "GAMES",
  {
    game_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    game_id: {
      type: DataTypes.STRING(255),
    },
    match_name:{
      type: DataTypes.STRING(255),
    },
    year: {
      type: DataTypes.INTEGER
    },
    team_ids: {
      type: DataTypes.STRING(255)
    }
  },
  {
    timestamps: false, // If you don't want Sequelize to manage createdAt and updatedAt fields
    tableName: "GAMES",
    returning: true, // This enables returning updated data
  }
);

games.associate = (models) => {
  games.hasMany(models.TEAMS, {
    foreignKey: "game_id",
  });
  
};

module.exports = Teams;
