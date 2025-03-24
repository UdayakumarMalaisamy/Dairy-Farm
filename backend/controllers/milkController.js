const MilkRecord = require('../models/MilkRecord');

exports.getMilkRecords = async (req, res) => {
  try {
    const records = await MilkRecord.find().populate('cowId', 'name');
    res.json(records);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createMilkRecord = async (req, res) => {
  try {
    const record = new MilkRecord(req.body);
    await record.save();
    res.status(201).json(record);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};