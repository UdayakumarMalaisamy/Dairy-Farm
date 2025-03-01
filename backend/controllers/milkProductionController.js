const MilkProduction = require('../models/MilkProduction');

// Get all milk production records
exports.getAllMilkProductions = async (req, res) => {
  try {
    const milkProductions = await MilkProduction.find();
    res.status(200).json(milkProductions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add a new milk production record
exports.addMilkProduction = async (req, res) => {
  const milkProduction = new MilkProduction({
    id: req.body.id,
    date: req.body.date,
    quantity: req.body.quantity,
    quality: req.body.quality,
    cowId: req.body.cowId,
    shift: req.body.shift,
  });

  try {
    const newMilkProduction = await milkProduction.save();
    res.status(201).json(newMilkProduction);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};