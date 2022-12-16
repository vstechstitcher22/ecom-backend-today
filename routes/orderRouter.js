const express = require("express");
const orders = require("../controllers/frontend/orderConroller");
const validation = require("../common/apiValidation");

const router = express();

router.post("/checkout", validation.orderValidation, orders.addOrder);

module.exports = router;
