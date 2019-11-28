const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv');
const morgan = require('morgan');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/error');
const app = express();

//Load env variables
dotenv.config({ path: './config/config.env' });

//Connect to DB
connectDB();

//Route files
const doctors = require('./routes/doctors');

//Dev logging Middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//Body Parser
app.use(express.json());

//Mount routers
app.use('/api/v1/doctors', doctors);

//Custome middlerware error handler
app.use(errorHandler);

//Start Server on PORT || 5000
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
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
