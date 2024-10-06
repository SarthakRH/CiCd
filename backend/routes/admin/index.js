const express = require('express')

const router = express.Router();

router.use('/category',require('./categoryRoutes'));
router.use('/question',require('./questionRoutes'));
router.use('/user',require('./userRoutes'));

module.exports = router;