//routes for authentication of users
const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const authControllers = require("../controllers/authControllers");
const auth = require("../middleware/auth");

//AUth a user for make login
// api/auth
router.post("/", authControllers.authenticateUser);

//Obtain user authenticated
router.get("/", auth, authControllers.readAuthenticatedUser);

module.exports = router;
