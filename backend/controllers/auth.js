const User = require("../models/User");
const asyncHandler = require("express-async-handler");
const ROLES = require('../config/roles')
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Input fields missing");
  }
  // Check if the email id is an nitk email id
  const regex = /^[\w.+\-]+@nitk\.edu\.in$/;
  // add better regex to check if email has a roll number
  if (!regex.test(email)) {
    res.status(400);
    throw new Error("Not a valid nitk email id");
  }

  // check if user exists
  const user = await User.findOne({ email });
  if (user) {
    res.status(400);
    throw new Error("User already exists");
  }
  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);
  // extract roll number from the email
  let roll = email.substring(email.indexOf(".")+1, email.indexOf("@"));
  roll = roll.toUpperCase();
  const yearOfPassing = "20" + (Number(roll.substring(0, 2)) + 4);
  const branch = roll.substring(3, 5);

  
  const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
    roll,
    branch,
    yearOfPassing,
    avatar: `https://avatars.dicebear.com/api/adventurer-neutral/${roll}.svg`,
  });
  const token = generateToken({
    id: newUser._id,
    name: newUser.name,
    role: newUser.role,
  });
  if (newUser) {
    res.status(201).json({
      id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      roll: newUser.roll,
      role: newUser.role,
      status: newUser.status,
      branch: newUser.branch,
      yearOfPassing: newUser.yearOfPassing,
      avatar: newUser.avatar,
      categories: newUser.categories,
      token,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("Input fields missing");
  }
  const user = await User.findOne({ email }).populate('categories');
  if (user && (await bcrypt.compare(password, user.password))) {
    const token = generateToken({
      id: user._id,
      name: user.name,
      role: user.role,
    });
    res.status(200).json({
      id: user._id,
      name: user.name,
      email: user.email,
      roll: user.roll,
      role: user.role,
      status: user.status,
      branch: user.branch,
      yearOfPassing: user.yearOfPassing,
      avatar:user.avatar,
      categories:user.categories,
      token,
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials!");
  }
});

const getUser = (req, res) => {
  res.status(200).json(req.user);
};

const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

module.exports = {
  registerUser,
  loginUser,
  getUser,
};
