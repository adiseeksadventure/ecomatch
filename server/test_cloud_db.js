const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const uri = process.env.MONGODB_URI;

console.log('Testing connection to CLOUD MongoDB...');

mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 })
  .then(() => {
    console.log('Successfully connected to CLOUD MongoDB!');
    process.exit(0);
  })
  .catch((err) => {
    console.error('Cloud connection failed:', err.message);
    process.exit(1);
  });
