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
  module.exports={updateUser,deleteUser}