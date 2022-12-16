const users = require("../../models/userSchema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const { validationResult } = require("express-validator");

// create user
const createUser = async (req, resp) => {
  const { firstName, lastName, email, phone, password } = req.body;
  if (!firstName || !lastName || !email || !phone || !password) {
    return resp.status(422).json({ message: "Please fill all detailt" });
  }
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return resp.status(400).json({ errors: errors.array() });
    }
    const userExist = await users.findOne({ email: email });
    if (userExist) {
      return resp.status(422).json({ message: "Email already registered" });
    }
    const newPassword = await bcrypt.hash(req.body.password, 10);
    const user = new users({
      firstName,
      lastName,
      email,
      phone,
      password: newPassword,
    });

    resp.setHeader("Content-Type", "application/json");
    await user.save();
    resp.status(201).json("user added");
  } catch (err) {
    resp.status(500).json(err);
  }
};

// get users information
const getUsers = async (req, resp) => {
  try {
    const userData = await users.find();
    resp.status(201).json(userData);
    console.log(userData);
  } catch (err) {
    resp.status(404).json(err);
  }
};

// update user information
const updateUser = async (req, resp) => {
  try {
    const { id } = req.params;

    const updateUser = await users.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    console.log(updateUser);
    resp.status(201).json(updateUser);
  } catch (err) {
    resp.status(422).json(err);
  }
};

// login users
const loginUser = async (req, resp) => {
  const { email, password } = req.body;
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return resp.status(400).json({ errors: errors.array() });
    }
    const userLogin = await users.findOne({ email: email });
    if (userLogin) {
      const isPasswordValid = await bcrypt.compare(
        req.body.password,
        userLogin.password
      );
      if (isPasswordValid) {
        const token = jwt.sign(
          {
            name: userLogin.firstName,
            email: userLogin.email,
          },
          "secret123"
        );
        return resp.json({
          status: "ok",
          user: token,
        });
      }
    } else {
      resp
        .status(400)
        .json({ message: "User not exist please create account" });
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  createUser,
  getUsers,
  updateUser,
  loginUser,
};
