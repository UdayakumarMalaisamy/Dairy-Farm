const Cow = require('../models/Cow');

exports.getCows = async (req, res) => {
  try {
    const cows = await Cow.find();
    res.json(cows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createCow = async (req, res) => {
  try {
    const cow = new Cow(req.body);
    await cow.save();
    res.status(201).json(cow);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};