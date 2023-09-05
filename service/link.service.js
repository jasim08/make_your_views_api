const linkdb = require("../models/sharedLinkandViews");
const { Sequelize, DataTypes } = require("sequelize");
const linkService = {};

linkService.getLink = async (data) => {
  try {
    return await linkdb.findOne({
      where: data,
    });
  } catch (err) {
    throw new Error(err.message);
  }
};

linkService.createLink = async (data) => {
  try {
    return await linkdb.create(data);
  } catch (err) {
    throw new Error(err.message);
  }
};

linkService.updateLink = async (id, newData) => {
  try {
    const [updatedRowCount, updatedLinks] = await linkdb.update(newData, {
      where: { id },
      returning: true, // Get the updated row(s) as a result
    });

    if (updatedRowCount === 0) {
      console.log("Link not found or no updates were made.");
      return null; // Return null to indicate no updates
    } else {
      return updatedLinks;
      return updatedLinks[0]; // Return the first updated link
    }
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
};

linkService.getRandomLink = async (userid, preferenceValue) => {
  try {
    return await linkdb.findAll({
      where: {
        preference: preferenceValue,
        pointAllocated: { [Sequelize.Op.gte]: 5 },
        userId: userid,
      },
      order: Sequelize.literal("RAND()"), // Order by random
      limit: 20,
    });
  } catch (err) {
    throw new Error(err.message);
  }
};
module.exports = linkService;
