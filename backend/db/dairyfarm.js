// db.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const dairyfarm = async () => {
  try {
    const conn = await mongoose.connect("mongodb+srv://Udayakumar007:Udayakumar007@cluster0.xbkdy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0%20:MONGO%20DB", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1); // Exit the process with a failure code
  }
};

module.exports = dairyfarm;