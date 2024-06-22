const jwt = require("jsonwebtoken");
const USER = require("../models/userSchema");
const secretKey = process.env.KEY;

const authenticate = async (req, res, next) => {
  try {
    const token = req.cookies.VogueMagazin;

    if (!token) {
      throw new Error("No token provided");
    }

    const verifyToken = jwt.verify(token, secretKey);
    console.log(verifyToken);

    const rootUser = await USER.findOne({
      _id: verifyToken._id,
      "tokens.token": token,
    });
    console.log(rootUser);

    if (!rootUser) {
      throw new Error("User not found");
    }

    req.token = token;
    req.rootUser = rootUser;
    req.userID = rootUser._id;

    next();
  } catch (error) {
    console.error(error);
    res.status(401).send("Unauthorized: No token provided or invalid token");
  }
};

module.exports = authenticate;
