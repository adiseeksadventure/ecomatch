const mongoose = require('mongoose');

const uri = 'mongodb://127.0.0.1:27017/ecomatch';

console.log('Testing connection to local MongoDB:', uri);

mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 })
  .then(() => {
    console.log('Successfully connected to LOCAL MongoDB!');
    process.exit(0);
  })
  .catch((err) => {
    console.error('Local connection failed:', err.message);
    process.exit(1);
  });
