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

const { protect, authrozie } = require('../middleware/auth');

//API
Router.route('/').get(getDoctors);
Router.route('/profile').post(protect, authrozie('doctor'), registerDoctor);

Router.route('/:id')
  .get(getDoctor)
  .put(protect, authrozie('doctor'), updateDoctor)
  .delete(protect, authrozie('doctor'), deleteDoctor);

Router.route('/:id/photo').put(protect, authrozie('doctor'), uploadDoctorPhoto);

module.exports = Router;
