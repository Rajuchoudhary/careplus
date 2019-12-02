const express = require('express');
const Router = express.Router();
const {
  getDoctors,
  getDoctor,
  registerDoctor,
  updateDoctor,
  deleteDoctor,
  uploadDoctorPhoto
} = require('../controllers/doctors');

//API
Router.route('/')
  .get(getDoctors)
  .post(registerDoctor);

Router.route('/:id')
  .get(getDoctor)
  .put(updateDoctor)
  .delete(deleteDoctor);

Router.route('/:id/photo').put(uploadDoctorPhoto);

module.exports = Router;
