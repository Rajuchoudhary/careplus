const mongoose = require('mongoose');

const PatientSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  photo: {
    type: String,
    default: 'photo.jpg'
  }
});

module.exports = mongoose.model('Patient', PatientSchema);
