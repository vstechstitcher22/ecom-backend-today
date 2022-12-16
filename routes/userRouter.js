const express = require("express");
const router = express.Router();

// import controllers
const validation = require("../common/apiValidation");
const userController = require("../controllers/frontend/userController");

// router.get("/",(req,res) =>{
//     console.log('route connected')
// })

// ! sign up
router.post("/signup", validation.signupValidation, userController.createUser);

// !Login route
router.post("/login", validation.loginValidation, userController.loginUser);

//! it's task
router.get("/getdata", userController.getUsers);

//! Update user Data
router.patch("/edituser/:id");

// delete user data
router.delete("/deleteuser/:id", userController.updateUser);
//

module.exports = router;
