const express = require('express');
const milkProductionController = require('../controllers/milkProductionController');

const router = express.Router();

router.get('/', milkProductionController.getAllMilkProductions);
router.post('/', milkProductionController.addMilkProduction);

module.exports = router;