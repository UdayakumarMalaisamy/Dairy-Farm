const express = require('express');
const router = express.Router();
const milkController = require('../controllers/milkController');

router.get('/', milkController.getMilkRecords);
router.post('/', milkController.createMilkRecord);

module.exports = router;