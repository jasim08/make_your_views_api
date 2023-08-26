const Sequelize = require("sequelize");

const sequelize = new Sequelize("makeyourviews", "root", "rootuser", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequelize;
