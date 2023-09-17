const { DataTypes } = require("sequelize");
const sequelize = require("../dbconnection/db");
const sharedlinks = sequelize.define(
  "sharedlinks",
  {
    link: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    linkType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    shortLink: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    views: {
      type: DataTypes.INTEGER,
      allowNull: false,
      default: 0,
    },
    preference: {
      type: DataTypes.INTEGER,
      allowNull: false,
      default: 1,
    },
    pointAllocated: {
      type: DataTypes.INTEGER,
      allowNull: false,
      default: 0,
    },

    userId: {
      // Foreign key field for the association
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: false, // If you don't want Sequelize to manage createdAt and updatedAt fields
  }
);

sharedlinks.associate = (models) => {
  sharedlinks.belongsTo(models.User, {
    foreignKey: "userId",
  });
};

module.exports = sharedlinks;
