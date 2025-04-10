require('dotenv').config();
const express = require('./config/express');
const app = express.init();


const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || 'localhost';
 
app.listen(PORT,() => {
  console.log(`Server is running on port ${HOST}:${PORT}`);
});
