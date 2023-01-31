const { verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("../config/verifyToken");
const { createProduct, updateProduct, deleteProduct, getProductById, getAllProducts } = require("../Controller/productController");


const router=require("express").Router();
router.post("/",verifyTokenAndAdmin,createProduct)
router.put("/:id",verifyTokenAndAdmin,updateProduct)
router.delete("/:id",verifyTokenAndAdmin,deleteProduct)
router.get("/find/:id",getProductById)
router.get("/",getAllProducts)


module.exports=router