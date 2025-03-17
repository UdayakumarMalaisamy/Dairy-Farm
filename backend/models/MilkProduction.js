// Milk Production Schema
const milkProductionSchema = new mongoose.Schema({
  cowId: { type: String, required: true },
  quantity: { type: Number, required: true },
  quality: { type: String, default: 'தரம் A' },
  shift: { type: String, enum: ['காலை', 'மாலை'], required: true },
  date: { type: Date, default: Date.now },
});

const MilkProduction = mongoose.model('MilkProduction', milkProductionSchema);