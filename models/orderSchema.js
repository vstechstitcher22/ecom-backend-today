const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  email: {
    type: "String",
    require: true,
  },
  firstName: {
    type: "String",
    require: true,
  },
  lastName: {
    type: "String",
    require: true,
  },
  address: {
    type: "String",
    require: true,
  },
  apartment: {
    type: "String",
    require: true,
  },
  city: {
    type: "String",
    require: true,
  },
  state: {
    type: "String",
    require: true,
  },
  pinCode: {
    type: "Number",
    require: true,
  },
  phone: {
    type: "Number",
    require: true,
  },
  productInfo: {
    type: "Array",
    require: true,
  },
});

const order = mongoose.model("order", orderSchema);

module.exports = order;
