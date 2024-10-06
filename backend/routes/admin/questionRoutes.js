const express = require("express");
const {addQuestion,getQuestionsOfACategory,deleteQuestion} = require('../../controllers/admin/question')
const router = express.Router();
const { protect, isAdmin } = require("../../middleware/authMiddleware");


router.post('/',protect,isAdmin,addQuestion)
router.get('/:catId',protect,getQuestionsOfACategory)
router.delete('/delete/:qId',protect,isAdmin,deleteQuestion)

module.exports = router;
