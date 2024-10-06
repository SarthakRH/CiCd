const asyncHandler = require("express-async-handler");
const User = require("../../models/User");
const ROLES = require("../../config/roles");
const mongoose = require("mongoose");

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({ role: { $ne: ROLES.ADMIN } }).populate('categories').lean();
  if (users) res.status(200).json(users);
  else throw new Error("Something went wrong!");
});
const getSingleUser = asyncHandler(async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    res.status(400);
    throw new Error("Invalid User Id");
  }
  const user = await User.findById(req.params.id).populate('categories').lean();
  if (user) res.status(200).json({ ...user });
  else {
    res.status(400);
    throw new Error("Something went wrong!");
  }
});
const updateUser = asyncHandler(async (req, res) => {
     if (!mongoose.isValidObjectId(req.params.id)) {
       res.status(400);
       throw new Error("Invalid User Id");
     }
     const updatedUser = await User.findByIdAndUpdate(req.params.id,req.body,{
        runValidators:true,
        new:true
     }).lean()
     res.status(200).json({...updatedUser})
});

const deleteUser = asyncHandler(async (req,res)=>{
    if (!mongoose.isValidObjectId(req.params.id)) {
      res.status(400);
      throw new Error("Invalid User Id");
    }
    const deletedUser = await User.findByIdAndDelete(req.params.id).lean();
    res.status(200).json({ ...deletedUser });
})


module.exports = { getAllUsers, getSingleUser,updateUser,deleteUser };
