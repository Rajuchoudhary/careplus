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
//get all doctors
Router.route('/')
  .get(getDoctors)
  .post(registerDoctor);

//get single doctor with id
Router.route('/:id')
  .get(getDoctor)
  .put(updateDoctor)
  .delete(deleteDoctor);

Router.route('/:id/photo').put(uploadDoctorPhoto);

module.exports = Router;
