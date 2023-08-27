const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  process.env.DBNAME,
  process.env.DBUSERNAME,
  process.env.DBPASSWORD,
  {
    host: process.env.DBHOST,
    dialect: process.env.DB,
  }
);
// sequelize.sync({ force: true });
sequelize.sync();

module.exports = sequelize;
