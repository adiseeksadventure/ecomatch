const dotenv = require('dotenv');
dotenv.config();
console.log('SECRET_START' + process.env.JWT_SECRET + 'SECRET_END');
