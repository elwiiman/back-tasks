const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  //read token form header
  const token = req.header("x-auth-token");

  // const token1 = req.header("Authorization");
  // console.log(token1);

  //Review if there is token
  if (!token) {
    res.status(401).json({ msg: "There is no token. Not valid permission" });
  }

  try {
    const cifrate = jwt.verify(token, process.env.SECRET);
    //validate token
    req.user = cifrate.user;
    next();
  } catch (error) {
    res.status(401).json({ msg: "Not valid token" });
  }
};
