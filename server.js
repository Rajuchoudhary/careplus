const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv');
const app = express();

//Load env variables
dotenv.config({ path: './config/config.env' });

//API
//get all doctors
app.get('/api/v1/doctors', (req, res) => {
  res.status(200).json({ success: true, msg: 'show all doctros' });
});

//get single doctor wih id
app.post('/api/v1/doctors/:id', (req, res) => {
  res.status(200).json({ success: true, msg: 'Show single doctor porfile' });
});

//register new doctor
app.post('/api/v1/doctors', (req, res) => {
  res.status(200).json({ success: true, msg: 'regsiter new doctor' });
});

//update doctor profile wit id
app.put('/api/v1/doctors/:id', (req, res) => {
  res.status(200).json({
    success: true,
    msg: `Updated doctor profile id: ${req.params.id}`
  });
});

//delete doctor profile with id
app.delete('/api/v1/doctors/:id', (req, res) => {
  res.status(200).json({
    success: true,
    msg: `Deleted doctor profile id: ${req.params.id}`
  });
});

//Start Server on PORT || 5000
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
