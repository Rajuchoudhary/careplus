const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
  appointments: [
    {
      doctorId: {
        type: mongoose.Schema.ObjectId,
        ref: 'Doctor',
        required: true
      },
      appointment: [
        {
          patientId: {
            type: mongoose.Schema.ObjectId,
            ref: 'Patient',
            required: true
          },
          status: {
            type: String,
            required: true
          },
          day: {
            type: String,
            required: true
          },
          time: {
            type: String,
            required: true
          }
        }
      ]
    }
  ]
});

module.exports = mongoose.model('Appointment', AppointmentSchema);
