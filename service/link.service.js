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
      },
      order: Sequelize.literal("RAND()"), // Order by random
      limit: 15,
    });
  } catch (err) {
    throw new Error(err.message);
  }
};

linkService.getmyLinks = async (userid, pageNumber, size) => {
  try {
    const pageSize = size;
    const offset = (pageNumber - 1) * pageSize;

    const dataQuery = {
      where: {
        userId: userid,
      },
      order: [["views", "DESC"]],
      limit: Number(pageSize),
      offset: (pageNumber - 1) * pageSize,
    };

    // Next, create a query to retrieve the count of records
    const countQuery = {
      where: {
        userId: userid,
      },
      attributes: [[Sequelize.fn("COUNT", Sequelize.col("*")), "count"]],
    };

    // Now, execute both queries in parallel using Promise.all
    const result = await Promise.all([
      linkdb.findAll(dataQuery),
      linkdb.findOne(countQuery),
    ]);

    return {
      data: result[0],
      count: result[1].dataValues.count,
    };
  } catch (err) {
    console.log(err);
    throw new Error(err.message);
  }
};
module.exports = linkService;
