const jwt = require("jsonwebtoken");
const { LogoutModel } = require("../model/logout.model");

const authenticate = async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];

  const black = await LogoutModel.find({ token });
  if (black.lengt > 0) {
    res.status(200).json({ msg: "login Again" });
  }

  if (token) {
    try {
      const decoded = jwt.verify(token, "roshan");

      if (decoded) {
        req.body.userID = decoded.userID;

        next();
      } else {
        res.status(200).json({ msg: "Not Authorized" });
      }
    } catch (error) {
      res.status(400).json({ msg: error.message });
    }
  } else {
    res.status(200).json({ msg: "please login!!" });
  }
};

module.exports = { authenticate };
