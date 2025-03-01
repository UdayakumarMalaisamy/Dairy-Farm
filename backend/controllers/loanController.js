const Loan = require('../models/Loan');

// Get all loans
exports.getAllLoans = async (req, res) => {
  try {
    const loans = await Loan.find();
    res.status(200).json(loans);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add a new loan
exports.addLoan = async (req, res) => {
  const loan = new Loan({
    id: req.body.id,
    date: req.body.date,
    amount: req.body.amount,
    purpose: req.body.purpose,
    interestRate: req.body.interestRate,
    status: req.body.status,
    dueDate: req.body.dueDate,
  });

  try {
    const newLoan = await loan.save();
    res.status(201).json(newLoan);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};