//routes for authentication of users
const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const authControllers = require("../controllers/authControllers");

//AUth a user
// api/auth
router.post(
  "/",
  [
    check("email", "Add a valid email").isEmail(),
    check("password", "Password must be minimum of 6 characters").isLength({
      min: 6,
    }),
  ],

  authControllers.authenticateUser
);

module.exports = router;
