// const dotenv = require('dotenv');
const express = require("express");
const app = express();
const cors = require("cors");
const users = require("./routes/userRouter");
const orders = require("./routes/orderRouter");
require("./db/conn");

const router = express.Router();
const bodyParser = require("body-parser");
// userid = vsharma password vsharma2219
// mongodb+srv://vsharma:vsharma2219@cluster0.gszl8rs.mongodb.net/?retryWrites=true&w=majority

const PORT = 8000;

// ! middlewares
app.use(express.json());
app.use(cors());
app.use(users);
app.use(orders);
app.use(bodyParser.urlencoded({ extended: false }));

app.listen(PORT, () => {
  console.log("server running");
});
