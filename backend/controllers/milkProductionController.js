// Add a new milk production record
app.post('/api/milk-production', async (req, res) => {
  try {
    const { cowId, quantity, quality, shift } = req.body;

    if (!cowId || !quantity || !shift) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const newRecord = new MilkProduction({
      cowId,
      quantity,
      quality,
      shift,
    });

    await newRecord.save();
    res.status(201).json(newRecord);
  } catch (error) {
    res.status(500).json({ error: 'Error adding milk production record' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});