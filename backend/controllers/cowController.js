const Cow = require('../models/Cow');

// Get all cows
exports.getAllCows = async (req, res) => {
  try {
    const cows = await Cow.find();
    res.status(200).json(cows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }a
};

// Add a new cow
exports.addCow = async (req, res) => {
  const cow = new Cow({
    id: req.body.id,
    name: req.body.name,
    breed: req.body.breed,
    age: req.body.age,
    status: req.body.status,
    lastMilking: req.body.lastMilking,
  });

  try {
    const newCow = await cow.save();
    res.status(201).json(newCow);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};