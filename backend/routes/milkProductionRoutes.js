// Routes

// Get all milk production records
app.get('/api/milk-production', async (req, res) => {
    try {
      const records = await MilkProduction.find();
      res.json(records);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching milk production records' });
    }
  });