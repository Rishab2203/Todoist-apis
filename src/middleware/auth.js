const jwt = require("jsonwebtoken");

const SECRET = "blackHat";

const verifyToken = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    res
      .status(400)
      .json({ message: "Invalid request token not found try login first" });
    console.log("no token found");
    return;
  }
  try {
    const user = jwt.verify(token, SECRET);
    // console.log(user);
    next();
  } catch (err) {
    return res
      .status(403)
      .json({ message: "Error verifying token", Error: err.message });
  }
};

module.exports = { verifyToken };
