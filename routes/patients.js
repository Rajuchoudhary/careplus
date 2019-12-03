const express = require('express');
const Router = express.Router();
const Patient = require('../models/Patient');
const {
  getPatients,
  getPatient,
  registerPatient,
  updatePatient,
  deletePatient,
  uploadPatientPhoto
} = require('../controllers/patients');

const { protect, authrozie } = require('../middleware/auth');

Router.route('/')
  .get(getPatients)
  .post(protect, authrozie('patient'), registerPatient);

Router.route('/:id')
  .get(getPatient)
  .put(protect, authrozie('patient'), updatePatient)
  .delete(protect, authrozie('patient'), deletePatient);

Router.route('/:id/photo').put(
  protect,
  authrozie('patient'),
  uploadPatientPhoto
);

module.exports = Router;
