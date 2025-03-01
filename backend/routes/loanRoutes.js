const express = require('express');
const loanController = require('../controllers/loanController');

const router = express.Router();

router.get('/', loanController.getAllLoans);
router.post('/', loanController.addLoan);

module.exports = router;