const linkService = require("../service/link.service");
const userService = require("../service/user.service");
const { encrypt } = require("../utils");
const { v4: uuidv4 } = require("uuid");
const getPagingData = require("../utils/pagination");

// Generate a UUIDv4

function getLinkType(link) {
  link = link.toLowerCase();
  const uniqulink = uuidv4().replaceAll("-", "/");
  if (link.includes("fb.") || link.includes("facebook.")) {
    return { linkType: "facebook", shortLink: "FB.com/" + uniqulink };
  } else if (link.includes("youtube.")) {
    return { linkType: "youtube", shortLink: "YT.com/" + uniqulink };
  } else if (link.includes("instagram") || link.includes("instag")) {
    return { linkType: "instagram", shortLink: "IG.com/" + uniqulink };
  } else {
    return { linkType: "link", shortLink: "OT.com/" + uniqulink };
  }
}

const linkController = {};

linkController.addNewLink = async (req, res, next) => {
  try {
    const { link, preference, pointAllocated } = req?.body;
    const user = req?.user;

    const linkExists = await linkService.getLink({
      userId: user.userid,
      link,
    });
    if (linkExists) {
      return res.status(409).send({ message: "link already exists" });
    }
    const links = getLinkType(link);

    const createLink = await linkService.createLink({
      userId: user.userid,
      link,
      preference,
      pointAllocated,
      views: 0,
      ...links,
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
    const { link, pointToBeAdded } = req?.body;
    const user = req?.user;
    const linkExists = await linkService.getLink({
      link,
    });
    if (!linkExists) {
      return res.status(404).send({ message: "Link not found." });
    }

    let views = 0;
    if (linkExists?.views || linkExists?.views == 0) {
      views = linkExists?.views + pointToBeAdded;
    }
    console.log(views, linkExists?.views);
    const updateLink = await linkService.updateLink(linkExists.id, {
      views: views,
    });
    if (!updateLink) {
      return res.status(500).send({ message: "Please try again later." });
    }

    const getUser = await userService.findOne({ user_id: user.userid });
    let points =
      getUser.points || getUser.points == 0
        ? getUser.points + pointToBeAdded
        : 0;
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

linkController.getRandomLinks = async (req, res, next) => {
  try {
    const userid = req.user.userid;
    console.log(userid);
    const links = await linkService.getRandomLink(userid, 1);

    return res.status(200).send({ message: "Data fetch Successfully.", links });
  } catch (err) {
    throw new Error(err.message);
  }
};
linkController.getmyLinks = async (req, res, next) => {
  try {
    const userid = req.user.userid;
    const { page, size } = req?.query;
    console.log("userId  ", page, size, userid);

    const links = await linkService.getmyLinks(userid, page, size);

    const result = getPagingData(links.data, page, size, links.count);

    return res
      .status(200)
      .send({ message: "Data fetch Successfully.", data: result });
  } catch (err) {
    console.log(err);
    throw new Error(err.message);
  }
};
module.exports = linkController;
