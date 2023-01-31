const { verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("../config/verifyToken");
const { updateUser, deleteUser, getUserById, getAllUsers, getAllUsersSats } = require("../Controller/userController");

const router=require("express").Router();
router.put("/:id",verifyTokenAndAuthorization,updateUser)
router.delete("/:id",verifyTokenAndAuthorization,deleteUser)
router.get("/find/:id",verifyTokenAndAdmin,getUserById)
router.get("/",verifyTokenAndAdmin,getAllUsers)
router.get("/stats",verifyTokenAndAdmin,getAllUsersSats)

module.exports=router