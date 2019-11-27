const mongoose = require('mongoose');

const DoctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
    trim: true,
    maxlength: [50, 'Name cannot be more than 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email'
    ]
  },
  password: {
    type: String,
    required: [true, 'Please add a password'],
    minlength: 6,
    select: false
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
  }
});

module.exports = mongoose.model('Doctor', DoctorSchema);
