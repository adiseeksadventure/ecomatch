const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/ecomatch';

console.log('Testing connection to:', uri);

mongoose.connect(uri)
  .then(() => {
    console.log('Successfully connected to MongoDB!');
    process.exit(0);
  })
  .catch((err) => {
    console.error('Connection failed:', err);
    process.exit(1);
  });
