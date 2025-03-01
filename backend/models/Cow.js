const mongoose = require('mongoose');

const cowSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  breed: { type: String, required: true },
  age: { type: Number, required: true },
  status: { type: String, required: true },
  lastMilking: { type: Date, required: true },
});

module.exports = mongoose.model('Cow', cowSchema);