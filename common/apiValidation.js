const { body } = require("express-validator");
const { validationMessage } = require("./validationMessage");
const users = require("../models/userSchema");

const signupValidation = [
  body("firstName", validationMessage.firstName).not().isEmpty().trim(),
  body("lastName", validationMessage.lastName).not().isEmpty().trim(),
  body("email", validationMessage.emailValidation)
    .not()
    .isEmpty()
    .trim()
    .isEmail(),
  body("phone")
    .not()
    .isEmpty()
    .trim()
    .isMobilePhone()
    .withMessage(validationMessage.mobileValidation),

  body("password", validationMessage.minMumPasswordValidation)
    .not()
    .isEmpty()
    .trim()
    .isStrongPassword({
      minLength: 6,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 0,
    }),
];

// ! Login validation
const loginValidation = [
  body("email", validationMessage.emailValidation)
    .not()
    .isEmpty()
    .isEmail()
    .trim()
    .custom(async (email) => {
      await users.findOne({ email }).then((user) => {
        if (!user) {
          return Promise.reject("your email is not register");
        }
      });
    }),
  body("password", validationMessage.minMumPasswordValidation)
    .not()
    .isEmpty()
    .isLength({ min: 6 })
    .trim()
    .isStrongPassword({
      minLength: 6,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
    }),
];

// ! order validation
const orderValidation = [
  body("firstName", validationMessage.firstName)
    .not()
    .isEmpty()
    .isLength({ min: 6 }),
  body("lastName", validationMessage.lastName).not().isEmpty(),
  body("address", validationMessage.addressValidationMessage).not().isEmpty(),
  body("city", validationMessage.cityValidationMessage).not().isEmpty(),
  body("state", validationMessage.stateValidationMessage).not().isEmpty(),
  body("pinCode", validationMessage.pincodeValidationMessage)
    .not()
    .isEmpty()
    .isNumeric(),
  body("mobile", validationMessage.mobileValidation)
    .not()
    .isEmpty()
    .isMobilePhone(),
];

module.exports = {
  signupValidation,
  loginValidation,
  orderValidation,
};
