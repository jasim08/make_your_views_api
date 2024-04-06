const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  process.env.MYTDBNAME,
  process.env.DBUSERNAME,
  process.env.DBPASSWORD,
  {
    host: process.env.DBHOST,
    dialect: process.env.DB,
  }
);
sequelize.sync({ force: false });
// sequelize.sync();

module.exports = sequelize;
