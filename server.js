const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv');
const morgan = require('morgan');
const fileUpload = require('express-fileupload');
const path = require('path');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/error');
const app = express();

//Load env variables
dotenv.config({ path: './config/config.env' });

//Connect to DB
connectDB();

//Body Parser
app.use(express.json());

//Cookie Parser
app.use(cookieParser());

//Route files
const users = require('./routes/auth');
const doctors = require('./routes/doctors');
const patients = require('./routes/patients');
const appointments = require('./routes/appointments');

//Dev logging Middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//File uploading
app.use(fileUpload());

//Set static folder
app.use(express.static(path.join(__dirname, 'public')));

//Mount routers
app.use('/api/v1/auth', users);
app.use('/api/v1/doctors', doctors);
app.use('/api/v1/patients', patients);
app.use('/api/v1/appointments', appointments);

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
