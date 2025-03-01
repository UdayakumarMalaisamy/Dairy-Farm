const mongoose = require('mongoose');

const milkProductionSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  date: { type: Date, required: true },
  quantity: { type: Number, required: true },
  quality: { type: String, required: true },
  cowId: { type: String, required: true },
  shift: { type: String, required: true },
});

module.exports = mongoose.model('MilkProduction', milkProductionSchema);