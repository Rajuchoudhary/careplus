const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv');
const app = express();

//Load env variables
dotenv.config({ path: './config/config.env' });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow
      .bold
  );
});

//Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  //Close server & exit process
  server.close(() => process.exit(1));
});
