const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
  doctor: {
    type: mongoose.Schema.ObjectId,
    ref: 'Doctor'
  },
  status: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  patient: {
    type: mongoose.Schema.ObjectId,
    ref: 'Patient'
  },
  appointment: [
    {
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
});

// AppointmentSchema.pre(/^find/, function(next) {
//   this.populate({
//     path: 'Doctor',
//     select: 'name'
//   }).populate({
//     path: 'Patient',
//     select: 'name'
//   });
// });

// AppointmentSchema.pre('save', function(next) {
//   this.status = 'open';
//   next();
// });

module.exports = mongoose.model('Appointment', AppointmentSchema);
