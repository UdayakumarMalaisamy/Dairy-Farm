const express = require('express');
const router = express.Router();
const cowController = require('../controllers/cowController');

router.get('/', cowController.getCows);
router.post('/', cowController.createCow);

module.exports = router;