const { verifyTokenAndAuthorization } = require("../config/verifyToken");
const { updateUser, deleteUser } = require("../Controller/userController");

const router=require("express").Router();
router.put("/:id",verifyTokenAndAuthorization,updateUser)
router.delete("/:id",verifyTokenAndAuthorization,deleteUser)
module.exports=router