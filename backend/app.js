const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect("mongodb+srv://Udayakumar007:Udayakumar007@cluster0.xbkdy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0%20:MONGO%20DB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

// Routes
const cowRoutes = require('./routes/cowRoutes');
const expenseRoutes = require('./routes/expenseRoutes');
const milkProductionRoutes = require('./routes/milkProductionRoutes');
const loanRoutes = require('./routes/loanRoutes');


app.use('/api/cows', cowRoutes);
app.use('/api/expenses', expenseRoutes);
app.use('/api/milk-production', milkProductionRoutes);
app.use('/api/loans', loanRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});