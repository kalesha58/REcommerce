const {
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
  verifyToken,
} = require("../config/verifyToken");
const {
  createCart,
  deleteCart,
  updateCart,
  getUserCartById,
  getAllCarts,
} = require("../Controller/cartController");

const router = require("express").Router();
router.post("/", verifyToken, createCart);
router.put("/:id", verifyTokenAndAuthorization, updateCart);
router.delete("/:id", verifyTokenAndAuthorization, deleteCart);
router.get("/find/:userId", verifyTokenAndAuthorization, getUserCartById);
router.get("/", verifyTokenAndAdmin, getAllCarts);

module.exports = router;
