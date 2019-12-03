const express = require('express');
const Router = express.Router();
const {
  registerUser,
  loginUser,
  getMe,
  forgotPassword,
  resetPassword,
  updateDetails,
  updatePassword
} = require('../controllers/auth');

const { protect } = require('../middleware/auth');

//API
Router.post('/register', registerUser);
Router.post('/login', loginUser);
Router.get('/me', protect, getMe);
Router.put('/updatedetails', protect, updateDetails);
Router.put('/updatepassword', protect, updatePassword);
Router.post('/forgotpassword', forgotPassword);
Router.put('/resetpassword/:resettoken', resetPassword);

module.exports = Router;
