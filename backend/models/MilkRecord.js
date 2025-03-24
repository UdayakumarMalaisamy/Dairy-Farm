const mongoose = require('mongoose');

const milkRecordSchema = new mongoose.Schema({
  cowId: { type: mongoose.Schema.Types.ObjectId, ref: 'Cow', required: true },
  quantity: { type: Number, required: true },
  quality: { type: String, enum: ['Quality A', 'Quality B', 'Quality C'], required: true },
  shift: { type: String, enum: ['Morning', 'Evening'], required: true },
  date: { type: Date, default: Date.now },
}, { timestamps: true });

module.exports = mongoose.model('MilkRecord', milkRecordSchema);