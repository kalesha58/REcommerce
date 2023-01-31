const Cart = require("../Models/Cart");

// {=====================================CREATE CART=================================}

const createCart = async (req, res, next) => {
  const newCart = new Cart(req.body);
  try {
    const saveProduct = await newCart.save();
    res.status(200).json(saveProduct);
  } catch (error) {
    return res.status(500).send({ message: "Unexpected Eror Occured" });
  }
};
// {=====================================UPDATE_CART=================================}
const updateCart = async (req, res, next) => {
  const id = req.params.id;
  try {
    const upadteCart = await Cart.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(upadteCart);
  } catch (error) {
    return res.status(500).send({ message: "Unexpected Eror Occured" });
  }
};

// {=====================================DELETE_CART=================================}
const deleteCart = async (req, res, nest) => {
  const id = req.params.id;
  let product;
  try {
    product = await Cart.findByIdAndRemove(id);
  } catch (error) {
    console.log(error);
  }
  if (!product) {
    return res.status(500).json({ message: "Something went Worng" });
  }
  res.status(200).json({ message: "Product Delete Sucessfully" });
};
//  {=====================================GET_USER_CART _BY_ID=================================}
const getUserCartById = async (req, res, next) => {
  const userId = req.params.userId;
  let cart;
  try {
    cart = await Cart.findOne({ userId });
  } catch (error) {
    return console.log(error);
  }
  if (!cart) {
    return res.status(404).json({ message: "Invalid product Id" });
  }
  return res.status(200).json(cart);
};
//  {=====================================GET_All_Carts=================================}

const getAllCarts = async (req, res, next) => {
  try {
    const carts = await Cart.find();
    res.status(200).send(carts);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  createCart,
  updateCart,
  deleteCart,
  getUserCartById,
  getAllCarts,
};
