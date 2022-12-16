const orders = require("../../models/orderSchema");
const { orderValidation } = require("../../common/validationMessage");
const { validationResult } = require("express-validator");

const addOrder = async (req, resp) => {
  const {
    email,
    firstName,
    lastName,
    address,
    apartment,
    city,
    state,
    pinCode,
    mobile,
    productInfo,
  } = req.body;
  try {
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
      return resp.status(400).json({ errors: errors.array() });
    }
    const order = new orders({
      email,
      firstName,
      lastName,
      address,
      apartment,
      city,
      state,
      pinCode,
      mobile,
      productInfo,
    });
    resp.setHeader("Content-Type", "application/json");
    await order.save();
    resp.status(201).json({ message: "Order saved" });

    // if (
    //   !email ||
    //   !firstName ||
    //   !lastName ||
    //   !address ||
    //   !apartment ||
    //   !city ||
    //   !state ||
    //   !pinCode ||
    //   !mobile
    // ) {
    //   return resp.status(401).json({ message: "Please fill all fields" });
    // }
  } catch (err) {
    console.log(err);
    return resp
      .status(401)
      .json({ message: "Please fill all fields catch part" });
  }
};

module.exports = {
  addOrder,
};
