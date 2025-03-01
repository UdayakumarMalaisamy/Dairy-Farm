const Expense = require('../models/Expense');

// Get all expenses
exports.getAllExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find();
    res.status(200).json(expenses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add a new expense
exports.addExpense = async (req, res) => {
  const { date, category, amount, description } = req.body;

  if (!date || !category || !amount) {
    return res.status(400).json({ message: 'Date, category, and amount are required' });
  }

  try {
    const newExpense = new Expense({ date, category, amount, description });
    await newExpense.save();

    // Return the updated list of expenses
    const updatedExpenses = await Expense.find();
    res.status(201).json(updatedExpenses);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
