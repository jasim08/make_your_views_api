const userService = require("../service/user.service");

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

    const createUser = await userService.createUser(data);

    return res.status(200).send({ data: createUser });
  } catch (err) {
    throw new Error(err.message);
  }
};

module.exports = userController;
