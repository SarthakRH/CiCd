const express = require("express");
const router = express.Router();
const { protect,isAdmin,roleNotUser } = require("../../middleware/authMiddleware");

const {
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser
} = require("../../controllers/admin/user");

router.get("/",protect,roleNotUser, getAllUsers);
router.get("/:id",protect,roleNotUser, getSingleUser)
router.delete('/:id',protect,isAdmin,deleteUser)
router.patch("/:id",protect,roleNotUser, updateUser);

module.exports = router;
