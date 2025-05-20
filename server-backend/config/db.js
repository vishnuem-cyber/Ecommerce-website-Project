const mongoose = require('mongoose'); 
const connectDB = async () => {

    
  const dbURL = process.env.MONGO_URL 
  console.log('Connecting to MongoDB at:', dbURL);

  try {
    await mongoose.connect(dbURL); 
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};
module.exports = connectDB;