const linkService = require("../service/link.service");
const userService = require("../service/user.service");
const { encrypt } = require("../utils");

const linkController = {};

linkController.addNewLink = async (req, res, next) => {
  try {
    const { link } = req?.body;
    const user = req?.user;

    const linkExists = await linkService.getLink({
      userId: user.userid,
      link,
    });
    if (linkExists) {
      return res.status(409).send({ message: "link already exists" });
    }

    const createLink = await linkService.createLink({
      userId: user.userid,
      link,
    });

    if (!createLink) {
      return res.status(500).send("Please try again later.");
    }

    return res.status(200).send({ message: "Link added Successfully." });
  } catch (err) {
    throw new Error(err.message);
  }
};

linkController.linkViewed = async (req, res, next) => {
  try {
    const { link } = req?.body;
    const user = req?.user;
    const linkExists = await linkService.getLink({
      link,
    });
    if (!linkExists) {
      return res.status(404).send({ message: "Link not found." });
    }

    let views = 0;
    if (linkExists?.views || linkExists?.views == 0) {
      views = linkExists?.views + 1;
    }

    const updateLink = await linkService.updateLink(linkExists.id, {
      views: views,
    });
    if (!updateLink) {
      return res.status(500).send({ message: "Please try again later." });
    }

    const getUser = await userService.findOne({ user_id: user.userid });
    let points = getUser.points || getUser.points == 0 ? getUser.points + 1 : 0;
    await userService.updateUserInfo(user.userid, {
      points,
    });

    return res
      .status(200)
      .send({ message: "points added Successfully.", points });
  } catch (err) {
    throw new Error(err.message);
  }
};

module.exports = linkController;
