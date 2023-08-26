const { Op } = require("sequelize");
const userdb = require("../models/user");

const userService = {};

userService.findUser = async (data) => {
  try {
    const query = {
      where: {
        [Op.or]: [{ username: data.username }, { email: data.email }],
      },
    };
    return await userdb.findOne(query);
  } catch (err) {
    throw new Error(err.message);
  }
};

userService.createUser = async (data) => {
  try {
    return await userdb.create(data);
  } catch (err) {
    throw new Error(err.message);
  }
};

module.exports = userService;
