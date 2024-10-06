const express = require("express");
const {
  getUser,
  loginUser,
  registerUser,
} = require("../controllers/auth");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/", protect, getUser);

module.exports = router;
