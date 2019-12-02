const express = require('express');
const Router = express.Router();
const {
  createAppointment,
  getAppointments,
  getAppointment,
  updateAppointment,
  deleteAppointment
} = require('../controllers/appointments');

//API
Router.route('/')
  .get(getAppointments)
  .post(createAppointment);

Router.route('/:id')
  .get(getAppointment)
  .put(updateAppointment)
  .delete(deleteAppointment);

module.exports = Router;
