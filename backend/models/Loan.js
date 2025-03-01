const mongoose = require('mongoose');

const loanSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  date: { type: Date, required: true },
  amount: { type: Number, required: true },
  purpose: { type: String, required: true },
  interestRate: { type: Number, required: true },
  status: { type: String, required: true, enum: ['செயலில்', 'செலுத்தப்பட்டது'] },
  dueDate: { type: Date, required: true },
});

module.exports = mongoose.model('Loan', loanSchema);