const mongoose = require('mongoose');

const DoctorSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  photo: {
    type: String,
    default: 'photo.jpg'
  },

  about: {
    type: String,
    required: [true, 'Please write something about yourself'],
    maxlength: [300, 'It cannot be more than 300 characters']
  },
  phone: {
    type: String,
    maxlength: [20, 'Phone number cannot be longer than 20 characters']
  },
  education: {
    type: [String],
    required: [true, 'Please add education']
  },
  experience: {
    type: [String],
    required: [true, 'Please add an experience']
  },
  address: {
    type: String,
    required: [true, 'Please add address']
  },
  speciality: {
    type: [String],
    required: [true, 'Please select your speciality']
  },
  socialMedia: [
    {
      media: String,
      link: String
    }
  ],
  schedule: {
    weekdays: {
      type: [String],
      required: [true, 'Please select your weekdays']
    },
    time: {
      type: [String],
      required: [true, 'Please select your time']
    }
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model('Doctor', DoctorSchema);
