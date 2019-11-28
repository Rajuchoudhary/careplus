const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Doctor = require('../models/Doctor');

//@desc         Get All Doctors
//@route        GET /api/v1/bootcamps
//@access       Public
exports.getDoctors = asyncHandler(async (req, res, next) => {
  let query;

  let queryStr = JSON.stringify(req.query);

  queryStr = queryStr.replace(/\b(in)\b/g, match => `$${match}`);

  console.log(queryStr);

  query = Doctor.find(JSON.parse(queryStr));

  const doctors = await query;

  res.status(200).json({ success: true, count: doctors.length, data: doctors });
});

//@desc         Get Single Doctors
//@route        GET /api/v1/bootcamps/:id
//@access       Public
exports.getDoctor = asyncHandler(async (req, res, next) => {
  const doctor = await Doctor.findById(req.params.id);

  if (!doctor) {
    return next(
      new ErrorResponse(`Doctor profile with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({ success: true, data: doctor });
});

//@desc         Register new Doctor
//@route        POST /api/v1/bootcamps/
//@access       Public
exports.registerDoctor = asyncHandler(async (req, res, next) => {
  const doctor = await Doctor.create(req.body);

  res.status(201).json({
    success: true,
    data: doctor
  });
});

//@desc         Update Doctor Profile
//@route        PUT /api/v1/bootcamps/:id
//@access       Private
exports.updateDoctor = asyncHandler(async (req, res, next) => {
  const doctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!doctor) {
    return next(
      new ErrorResponse(`Doctor profile with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ success: true, data: doctor });
});

//@desc         Delete Doctor Profile
//@route        DELETE /api/v1/bootcamps/:id
//@access       Private
exports.deleteDoctor = asyncHandler(async (req, res, next) => {
  const doctor = await Doctor.findByIdAndDelete(req.params.id);

  if (!doctor) {
    return next(
      new ErrorResponse(`Doctor profile with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ success: true, data: {} });
});
