const { authRegister, authLogin } = require("../Controller/authController");

const router=require("express").Router();
// {=======================================REGISTER+++++++++==============================}
router.post("/register",authRegister)
router.post("/login",authLogin)
module.exports=router