const User = require("../models/User");
const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

exports.createUser = async (req, res) => {
  //check if errors
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { password, email } = req.body;

  try {
    //check if email is unique

    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ msg: "The user already existis" });
    }

    //create new user
    user = new User(req.body);

    //Hash password
    const salt = await bcryptjs.genSalt(10);
    user.password = await bcryptjs.hash(password, salt);

    //save new user
    await user.save();

    //create and sign jsonwebtoken /
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
  } catch (error) {
    console.log(error);
    res.status(400).send("There was an error");
  }
};
