const { IMAGES } = require("../constant");
const sendMail = require("../helpers/sendmail");
const userService = require("../service/user.service");
const { OTPGenerator } = require("../utils");
const moment = require("moment-timezone");
const userController = {};

userController.signUp = async (req, res, next) => {
  try {
    console.log(req.body);
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
    const expiresAt = moment().add(2, "minutes");
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

module.exports = userController;
