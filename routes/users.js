//routes for create users
const express = require("express");
const router = express.Router();
const userControllers = require("../controllers/userControllers");
const { check } = require("express-validator");

//Create a user
// api/users
router.post(
  "/",
  [
    check("name", "The name is mandatory").not().isEmpty(),
    check("email", "Add a valid email").isEmail(),
    check("password", "Password must be minimum of 6 characters").isLength({
      min: 6,
    }),
  ],

  userControllers.createUser
);

module.exports = router;
