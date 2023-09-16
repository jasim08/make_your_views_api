const { Op } = require("sequelize");
const userdb = require("../models/user");
const otpdb = require("../models/otp");

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

userService.findOne = async (data) => {
  try {
    return await userdb.findOne({
      where: data,
    });
  } catch (err) {
    throw new Error(err.message);
  }
};
userService.findOneAndUpdate = async (userId, points) => {
  try {
    console.log("userererererer   ", userId, points);
    const record = await userdb.findOne({ where: { user_id: userId } });
    console.log(record);
    if (record) {
      return await record.update({ points: record.points + points });
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error:", error);
    throw new Error(error.message);
  }
};
userService.getOTP = async (data) => {
  try {
    return await otpdb.findOne({
      where: data,
      order: [["createdAt", "DESC"]],
    });
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

userService.createOTP = async (data) => {
  try {
    return await otpdb.create(data);
  } catch (err) {
    throw new Error(err.message);
  }
};

userService.updateUserInfo = async (user_id, newData) => {
  try {
    const updateUser = await userdb.update(newData, {
      where: { user_id: user_id },
      returning: true, // Get the updated user as a result
    });

    return updateUser;
  } catch (error) {
    throw new Error(error.message);
  }
};
userService.deleteOTPbyid = async (id) => {
  try {
    return await otpdb.destroy({
      where: { id: id },
    });
  } catch (error) {
    throw new Error(error.message);
  }
};
module.exports = userService;
