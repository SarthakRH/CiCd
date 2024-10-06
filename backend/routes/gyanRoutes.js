const express = require('express')
const {
    getAllGyans,
    getSingleGyan,
    addGyan,
    updateGyan,
    deleteGyan,
    getAllGyansByAUser
} = require('../controllers/gyan')
const { protect } = require("../middleware/authMiddleware");

 
const router = express.Router();

router.route('/')
.get(getAllGyans)
.post(protect,addGyan)

router.route('/:id')
.get(getSingleGyan)
.patch(protect,updateGyan)
.delete(protect,deleteGyan)

router.get('/user/:id',getAllGyansByAUser)

module.exports = router