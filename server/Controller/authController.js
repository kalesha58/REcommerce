const User = require("../Models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// {=====================================REGISTER_USER=================================}
const authRegister = async (req, res) => {
  const { username, email, password } = req.body;
  if (
    !username &&
    username.trim() === "" &&
    !email &&
    email.trim() === "" &&
    !password &&
    password.trim() === ""
  ) {
    return res.status(422).json({ message: "Invalid Inputs" });
  }
  const hashPassword = bcrypt.hashSync(password);
  let user;
  try {
    user = new User({ username, email, password: hashPassword });
    user = await user.save();
  } catch (error) {
    return console.log(error);
  }
  if (!user) {
    return res.status(500).json({ message: "Unexpected Error Occured" });
  }
  return res.status(201).json(user);
};

// {=====================================LOGIN_USER=================================}
const authLogin = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email && email.trim() === "" && !password && password.trim() === "") {
    return res.status(422).json({ message: "Invalid Inputs" });
  }
  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (error) {
    return console.log(error);
  }
  if (!existingUser) {
    return res
      .status(404)
      .json({ message: "Unable to find user from this ID " });
  }
  const isPassword = bcrypt.compareSync(password, existingUser.password);
  if (!isPassword) {
    res.status(400).json({ message: "InCorrect Password!" });
  }
  //  ================================= JSON_WEB_TOKEN================
  const accessToken = jwt.sign(
    {
      id: existingUser._id,
      isAdmin: existingUser.isAdmin,
    },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
  existingUser = existingUser._doc;
  return res.status(200).json({ ...existingUser, accessToken });
};
module.exports = { authRegister, authLogin };
