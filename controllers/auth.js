const crypto = require('crypto');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const User = require('../models/User');
const sendEmail = require('../utils/sendEmail');

//@desc         Register new User
//@route        POST /api/v1/auth/register
//@access       Public
exports.registerUser = asyncHandler(async (req, res, next) => {
  const { name, email, password, role } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    role
  });

  sendToeknResponse(user, 200, res);
});

//@desc         Login User
//@route        POST /api/v1/auth/register
//@access       Public
exports.loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  //Validate email and password
  if (!email || !password) {
    return next(
      new ErrorResponse('Please provide and email and password'),
      400
    );
  }

  //Check for the user
  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    return next(new ErrorResponse('Invalid credentials', 401));
  }

  //Check if password matches
  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    return next(new ErrorResponse('Invalid credentials', 401));
  }

  sendToeknResponse(user, 200, res);
});

//@desc         Get current Logged in User
//@route        POST /api/v1/auth/me
//@access       Private
exports.getMe = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({
    success: true,
    data: user
  });
});

//@desc         Update user details
//@route        PUT /api/v1/auth/updatedetails
//@access       Private
exports.updateDetails = asyncHandler(async (req, res, next) => {
  const fieldsToUpdate = {
    name: req.body.name,
    email: req.body.email
  };

  const user = await User.findByIdAndUpdate(req.user.id, fieldsToUpdate, {
    new: true,
    runValidators: true
  });
  res.status(200).json({
    success: true,
    data: user
  });
});

//@desc         Update password
//@route        PUT /api/v1/auth/updatepassword
//@access       Private
exports.updatePassword = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id).select('+password');

  //Check current password
  if (!(await user.matchPassword(req.body.currentPassword))) {
    return next(new ErrorResponse('Password is incorrect', 401));
  }

  user.password = req.body.newPassword;
  await user.save();

  sendToeknResponse(user, 200, res);
});

//@desc         Forgot Password
//@route        POST /api/v1/auth/forgotpassword
//@access       Public
exports.forgotPassword = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorResponse('There is no user with that email', 404));
  }

  //Get reset token
  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  //Create reset url
  const resetUrl = `${req.protocol}://${req.get(
    'host'
  )}/api/v1/auth/resetpassword/${resetToken}`;

  const message = `click to reset password ${resetUrl}`;

  try {
    await sendEmail({ email: user.email, subject: 'Reset Password', message });

    res.status(200).json({ success: true, data: 'email sent' });
  } catch (err) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    return next(new ErrorResponse('email could not be sent', 500));
  }

  console.log('token', resetToken);

  res.status(200).json({
    success: true,
    data: user
  });
});

//@desc         Reset password
//@route        PUT /api/v1/auth/resetpassword/:resettoken
//@access       Public
exports.resetPassword = asyncHandler(async (req, res, next) => {
  //Get hashed toekn
  const resetPasswordToken = crypto
    .createHash('sha256')
    .update(req.params.resettoken)
    .digest('hex');

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: {
      $gt: Date.now()
    }
  });

  if (!user) {
    return next(new ErrorResponse('Invalid Token', 400));
  }

  //Set new password
  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();

  sendToeknResponse(user, 200, res);
});

//Get token from model and create cookie and send respons
const sendToeknResponse = (user, statusCode, res) => {
  //create token
  const token = user.getSignedJwtToekn();

  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true
  };

  if (process.env.NODE_ENV === 'production') {
    options.secure = true;
  }

  res
    .status(statusCode)
    .cookie('token', token, options)
    .json({ success: true, token });
};
