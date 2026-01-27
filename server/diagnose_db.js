const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fs = require('fs');

dotenv.config();

const uri = process.env.MONGODB_URI;

console.log('Testing connection to CLOUD MongoDB...');

mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 })
  .then(() => {
    fs.writeFileSync('db_test_result.txt', 'SUCCESS');
    console.log('Successfully connected to CLOUD MongoDB!');
    process.exit(0);
  })
  .catch((err) => {
    const errorMsg = `Cloud connection failed: ${err.message}`;
    fs.writeFileSync('db_test_result.txt', errorMsg);
    console.error(errorMsg);
    process.exit(1);
  });
