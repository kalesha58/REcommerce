const User = require("../Models/User");
const bcrypt = require("bcryptjs");

// {=====================================UPDATE_USER=================================}
const updateUser = async (req, res, next) => {
    const id = req.params.id;
    const { username, email, password } = req.body;
    if (
      (!username &&
        username.trim() === "" &&
        !email &&
        email.trim() === "" &&
        !password &&
        password.trim() === "" 
     )
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
  return res.status(200).json( user );
};
//  {=====================================GET_All_Users=================================}

const getAllUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find();
  } catch (error) {
    return next(error);
  }
  if (!users) {
    return res.status(500).send({ message: "Unexpected Eror Occured" });
  }
  return res.status(200).send(users );
};

  module.exports={updateUser,deleteUser,getUserById,getAllUsers}