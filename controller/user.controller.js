const { IMAGES } = require("../constant");
const sendMail = require("../helpers/sendmail");
const userService = require("../service/user.service");
const { OTPGenerator, genHash, generateAccessToken } = require("../utils");
const moment = require("moment-timezone");
const userController = {};

userController.signUp = async (req, res, next) => {
  try {
    const { username, email, password } = req?.body;
    const hashpassword = password + email;
    const data = {
      username,
      email,
      password_hash: hashpassword,
    };
    const result = await userService.findUser(data);

    if (result) {
      let messages = {};
      if (result.username == username) {
        messages["username"] = "username already exists";
      }
      if (result.email == email) {
        messages["email"] = "email already exists";
      }
      return res.status(409).send(messages);
    }

    let createUser = await userService.createUser(data);
    if (!createUser) {
      return res.status(500).status({ message: "Internal Server Error." });
    }
    createUser = JSON.parse(JSON.stringify(createUser));
    const OTP = OTPGenerator();
    const expiresAt = moment().add(process.env.OTPEXPIRES, "minutes");
    userService.createOTP({ code: OTP, userId: createUser.user_id, expiresAt });
    sendMail(
      "MY Views <" + process.env.GMAIL_ACCOUNT + ">",
      email,
      "OTP - Email Verification",
      "../mailtemplates/verificationMailTemplate.hbs",
      { name: username, OTP: OTP, images: IMAGES }
    );

    delete createUser.password_hash;
    return res.status(200).send(createUser);
  } catch (err) {
    throw new Error(err.message);
  }
};

userController.sentEmailOTP = async (req, res, next) => {
  try {
    const { email } = req?.body;
    let user = await userService.findOne({ email: email.toLowerCase() });
    if (!user) {
      const data = {
        username: email.split("@")[0],
        email: email.toLowerCase(),
        password_hash: genHash("password" + this.username + email),
        points: 100,
      };
      user = await userService.createUser(data);
    }
    let OTP;
    if (email.toLowerCase() == "googletester123@myvtest.com") {
      OTP = 1111;
    } else {
      OTP = OTPGenerator();
    }

    const expiresAt = moment().add(process.env.OTPEXPIRES, "minutes");
    userService.createOTP({ code: OTP, userId: user.user_id, expiresAt });
    sendMail(
      "MY Views <" + process.env.GMAIL_ACCOUNT + ">",
      email,
      "OTP - Email Verification",
      "../mailtemplates/verificationMailTemplate.hbs",
      { name: user.username, OTP: OTP, images: IMAGES }
    );

    return res.status(200).send({ message: "OTP sent to " + email });
  } catch (err) {
    console.log(err);
    throw new Error(err.message);
  }
};

userController.userVerify = async (req, res, next) => {
  try {
    const { email, otp } = req?.body;
    let user = await userService.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res
        .status(404)
        .send({ message: "User not found. SignUp or Login" });
    }
    console.log(user);

    const OTPData = await userService.getOTP({ userId: user.user_id });
    if (!OTPData) {
      return res.status(401).send({ message: "OTP invalid" });
    }
    const currData = new Date();
    if (OTPData && currData > OTPData.expiresAt) {
      return res
        .status(401)
        .send({ message: "OTP invalid or expired. Try with valid OTP." });
    }

    if (OTPData.code !== otp) {
      return res.status(409).send({ message: "OTP invalid" });
    }

    userService.updateUserInfo(user.user_id, {
      verified: 1,
    });

    await userService.deleteOTPbyid(OTPData.id);
    user = JSON.parse(JSON.stringify(user));
    delete user.password_hash;
    user.access_token = generateAccessToken(
      {
        userid: user.user_id,
        email: user.email,
      },
      process.env.JWT_EXPIRE_TIME
    );
    return res
      .status(200)
      .send({ message: email + " verified successfully.", data: user });
  } catch (err) {
    console.log(err);
    throw new Error(err.message);
  }
};

userController.getUser = async (req, res, next) => {
  try {
    const { user_id } = req.params;
    console.log(user_id);
    const result = await userService.findOne({ user_id: user_id });
    console.log(result);
    if (!result) {
      return res.status(404).send({ message: "user not found" });
    }
    return res.status(200).send({ data: result });
  } catch (err) {
    next(err);
  }
};
userController.adviewPointsUpdate = async (req, res, next) => {
  try {
    const { userid } = req.user;
    const { points } = req.body;
    console.log(userid);
    const result = await userService.findOneAndUpdatePoints(
      userid,
      points,
      "add"
    );
    console.log(result);
    if (!result) {
      return res.status(404).send({ message: "user not found" });
    }
    return res.status(200).send({ data: result });
  } catch (err) {
    next(err);
  }
};

userController.subtractviewpointsUpdate = async (req, res, next) => {
  try {
    const { userid } = req.user;
    const { points } = req.body;
    console.log(userid);

    const result = await userService.findOneAndUpdatePoints(
      userid,
      points,
      "sub"
    );
    console.log(result);
    if (!result) {
      return res.status(404).send({ message: "user not found" });
    }
    return res.status(200).send({ data: result });
  } catch (err) {
    next(err);
  }
};
module.exports = userController;
