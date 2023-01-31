const Order = require("../Models/Order");

// {=====================================CREATE_Order=================================}

const createOrder = async (req, res, next) => {
  const newOrder = new Order(req.body);
  try {
    const saveOrder = await newOrder.save();
    res.status(200).json(saveOrder);
  } catch (error) {
    return res.status(500).send({ message: "Unexpected Eror Occured" });
  }
};
// {=====================================UPDATE_CART=================================}
const updateOrder = async (req, res, next) => {
  const id = req.params.id;
  try {
    const upadteOrder = await Order.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(upadteOrder);
  } catch (error) {
    return res.status(500).send({ message: "Unexpected Eror Occured" });
  }
};

// {=====================================DELETE_ORDER=================================}
const deleteOrder = async (req, res, nest) => {
  const id = req.params.id;
  let order;
  try {
    order = await Order.findByIdAndRemove(id);
  } catch (error) {
    console.log(error);
  }
  if (!order) {
    return res.status(500).json({ message: "Something went Worng" });
  }
  res.status(200).json({ message: "order Delete Sucessfully" });
};
//  {=====================================GET_USER_ORDERS_BY_ID=================================}
const getUserOrdersById = async (req, res, next) => {
  const userId = req.params.userId;
  let orders;
  try {
    orders = await Order.find({ userId });
  } catch (error) {
    return console.log(error);
  }
  if (!orders) {
    return res.status(404).json({ message: "Invalid product Id" });
  }
  return res.status(200).json(orders);
};
//  {=====================================GET_All_ORDERS=================================}

const getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.find();
    res.status(200).send(orders);
  } catch (error) {
    res.status(500).send(error);
  }
};

//  {=====================================GET_MONTHLY_INCOME=================================}
const getMonthlyIncome = async (req, res, next) => {
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(date.setMonth(lastMonth.getMonth() - 1));
  try {
    const income = await Order.aggregate([
      {
        $match: { createdAt: { $gte: previousMonth } },
      },
      {
        $project: { month: { $month: "$createdAt" }, sales: "$amount" },

        $group: {
          _id: "$month",
          total: { $sum: "$sales" },
        },
      },
    ]);
    res.status(200).json(income);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  createOrder,
  updateOrder,
  deleteOrder,
  getUserOrdersById,
  getAllOrders,
  getMonthlyIncome,
};
