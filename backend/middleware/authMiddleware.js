const jwt = require("jsonwebtoken");
require("dotenv").config();
const ROLES = require('../config/roles')

const protect = (req, res, next) => {
  const auth = req.headers["authorization"];
  const token = auth && auth.split(" ")[1];
  if (token == null) {
    res.status(401);
    throw new Error("Authentication token needed");
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      res.status(403);
      throw new Error("Invalid authorization token");
    }
    req.user = user;
    next();
  });
};

const isAdmin = (req,res,next)=>{
  if(req.user && req.user.role == ROLES.ADMIN) next()
  else{
    res.status(403);
    throw new Error("Error! Trying to access ADMIN only route")
  }
}

const roleNotUser = (req, res, next) => {
  if (req.user && req.user.role != ROLES.USER) next();
  else {
    res.status(403);
    throw new Error("Error! Trying to access ADMIN or Coordinator only route");
  }
};

module.exports = { protect,isAdmin,roleNotUser};
