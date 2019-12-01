const express = require('express');
const Router = express.Router();
const Patient = require('../models/Patient');
const {
  getPatients,
  getPatient,
  registerPatient,
  updatePatient,
  deletePatient
} = require('../controllers/patients');

//@desc         Get All Patients
//@route        GET /api/v1/patients/
//@access       Public
Router.route('/').get(getPatients);

//@desc         Get Single Patient
//@route        GET /api/v1/patients/:id
//@access       Public
Router.route('/:id').get(getPatient);

//@desc         Register Patient
//@route        POST /api/v1/patients/
//@access       Public
Router.route('/').post(registerPatient);

//@desc         Update Single Patient
//@route        PUT /api/v1/patients/:id
//@access       Private
Router.route('/:id').put(updatePatient);

//@desc         Delete Single Patient
//@route        DELETE /api/v1/patients/:id
//@access       Private
Router.route('/:id').delete(deletePatient);

module.exports = Router;
