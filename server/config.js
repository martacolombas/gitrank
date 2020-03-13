const dotenv = require('dotenv');
dotenv.config();
module.exports = {
  id: process.env.CLIENT_ID,
  key: process.env.CLIENT_SECRET,
  port: process.env.PORT
};