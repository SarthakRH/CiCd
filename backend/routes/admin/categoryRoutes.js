const express = require("express");
const {
  getCategories,
  addCategory,
  getSingleCategory,
  deleteCategory,
} = require("../../controllers/admin/category");
const router = express.Router();
const {protect,isAdmin} = require('../../middleware/authMiddleware')

router.route("/").get(getCategories).post(protect,isAdmin,addCategory);

router.route("/:id").get(getSingleCategory).delete(protect,isAdmin,deleteCategory);

module.exports = router;
