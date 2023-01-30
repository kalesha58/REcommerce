const router=require("express").Router();
router.get("/user",(req,res)=>{
    res.send("I am from user Router")
})
module.exports=router