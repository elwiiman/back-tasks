const User = require("../models/User");
const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

exports.authenticateUser = async (req, res) => {
  //check if errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    //Check if user is registered
    let user = await User.findOne({ email });

    if (!user) return res.status(400).json("The user doesnt exist");

    //review password
    const correctPassword = await bcryptjs.compare(password, user.password);
    if (!correctPassword) {
      return res.status(400).json({ msg: "Incorrect password" });
    }

    //IF EVERYTHING IS CORRECT
    //create and sign jsonwebtoken
    const payload = {
      user: {
        id: user.id,
      },
    };

    //sign jwt
    jwt.sign(
      payload,
      process.env.SECRET,
      { expiresIn: 3600 }, //1 hour
      (error, token) => {
        if (error) {
          throw error;
        }
        //send confirmation message
        res.json({ token: token });
      }
    );
  } catch {
    console.log(error);
  }
};
