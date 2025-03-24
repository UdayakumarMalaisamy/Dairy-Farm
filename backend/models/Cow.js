const mongoose = require('mongoose');

const cowSchema = new mongoose.Schema({
  name: { type: String, required: true },
  breed: { type: String, required: true },
  age: { type: Number, required: true },
  status: { type: String, enum: ['Healthy', 'Pregnant', 'Sick', 'No Milk'], required: true },
});

module.exports = mongoose.model('Cow', cowSchema);