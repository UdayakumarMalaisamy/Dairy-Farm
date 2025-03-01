const express = require('express');
const cowController = require('../controllers/cowController');

const router = express.Router();

router.get('/', cowController.getAllCows);
router.post('/', cowController.addCow);

module.exports = router;