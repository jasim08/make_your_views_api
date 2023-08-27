const { DataTypes } = require("sequelize");
const sequelize = require("../dbconnection/db");
const OTP = sequelize.define(
  "otps",
  {
    code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    expiresAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    userId: {
      // Foreign key field for the association
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: true, // If you don't want Sequelize to manage createdAt and updatedAt fields
    tableName: "otps",
  }
);

OTP.associate = (models) => {
  OTP.belongsTo(models.User, {
    foreignKey: "userId",
  });
};

module.exports = OTP;
