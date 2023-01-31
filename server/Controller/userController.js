const User = require("../Models/User");
const bcrypt = require("bcryptjs");

// {=====================================UPDATE_USER=================================}
const updateUser = async (req, res, next) => {
  const id = req.params.id;
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
    user = await User.findByIdAndUpdate(id, {
      username,
      email,
      password: hashPassword,
    });
  } catch (error) {
    return console.log(error);
  }
  if (!user) {
    return res.status(500).json({ message: "Something went Worng" });
  }
  res.status(200).json(user);
};
// {=====================================DELETE_USER=================================}
const deleteUser = async (req, res, nest) => {
  const id = req.params.id;
  let user;
  try {
    user = await User.findByIdAndRemove(id);
  } catch (error) {
    console.log(error);
  }
  if (!user) {
    return res.status(500).json({ message: "Something went Worng" });
  }
  res.status(200).json({ message: "Delete Sucessfully" });
};
//  {=====================================GET_USER_BY_ID=================================}
const getUserById = async (req, res, next) => {
  const id = req.params.id;
  let user;
  try {
    user = await User.findById(id);
  } catch (error) {
    return console.log(error);
  }
  if (!user) {
    return res.status(404).json({ message: "Invalid user Id" });
  }
  return res.status(200).json(user);
};
//  {=====================================GET_All_Users=================================}

const getAllUsers = async (req, res, next) => {
  const query = req.query.new;
  let users;
  try {
    users = query
      ? await User.find().sort({ _id: -1 }).limit(5)
      : await User.find();
  } catch (error) {
    return next(error);
  }
  if (!users) {
    return res.status(500).send({ message: "Unexpected Eror Occured" });
  }
  return res.status(200).send(users);
};
//  {=====================================GET_USER_STATASTICS=================================}
const getAllUsersSats = async (req, res, next) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
  try {
    const data = await User.aggregate([
      { $match: { createdAt: { $gte: lastYear } } },
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);
    res.status(200).send(data);
  } catch (error) {
    return res.status(500).send({ message: "Unexpected Eror Occured" });
  }
};

module.exports = {
  updateUser,
  deleteUser,
  getUserById,
  getAllUsers,
  getAllUsersSats,
};
