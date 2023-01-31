const Product = require("../Models/Product");
const bcrypt = require("bcryptjs");

// {=====================================CREATE_PRODUCT=================================}

const createProduct = async (req, res, next) => {
  const newProduct = new Product(req.body);
  try {
    const saveProduct = await newProduct.save();
    res.status(200).json(saveProduct);
  } catch (error) {
    return res.status(500).send({ message: "Unexpected Eror Occured" });
  }
};
// {=====================================UPDATE_PRODUCT=================================}
const updateProduct = async (req, res, next) => {
  const id = req.params.id;
  try {
    const upadteProduct = await Product.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(upadteProduct);
  } catch (error) {
    return res.status(500).send({ message: "Unexpected Eror Occured" });
  }
};

// {=====================================DELETE_USER=================================}
const deleteProduct = async (req, res, nest) => {
  const id = req.params.id;
  let product;
  try {
    product = await Product.findByIdAndRemove(id);
  } catch (error) {
    console.log(error);
  }
  if (!product) {
    return res.status(500).json({ message: "Something went Worng" });
  }
  res.status(200).json({ message: "Product Delete Sucessfully" });
};
//  {=====================================GET_Product_BY_ID=================================}
const getProductById = async (req, res, next) => {
  const id = req.params.id;
  let product;
  try {
    product = await Product.findById(id);
  } catch (error) {
    return console.log(error);
  }
  if (!product) {
    return res.status(404).json({ message: "Invalid product Id" });
  }
  return res.status(200).json(product);
};
//  {=====================================GET_All_Products=================================}

const getAllProducts = async (req, res, next) => {
  const qNew = req.query.new;
  const qCategory = req.query.category;
  let products;
  try {
    if (qNew) {
      products = await Product.find().sort({ createdAt: -1 }).limit(1);
    } else if (qCategory) {
      products = await Product.find({ categories: { $in: [qCategory] } });
    } else {
      products = await Product.find();
    }
  } catch (error) {
    return next(error);
  }
  if (!products) {
    return res.status(500).send({ message: "Unexpected Eror Occured" });
  }
  return res.status(200).send(products);
};

module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
  getProductById,
  getAllProducts,
};
