const path = require('path');
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
      new ErrorResponse(
        `Doctor profile with id of ${req.params.id} not found`,
        404
      )
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
      new ErrorResponse(
        `Doctor profile with id of ${req.params.id} not found`,
        404
      )
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
      new ErrorResponse(
        `Doctor profile with id of ${req.params.id} not found`,
        404
      )
    );
  }
  res.status(200).json({ success: true, data: {} });
});

//@desc         Upload Doctor Profile Image
//@route        PUT /api/v1/bootcamps/:id/photo
//@access       Private
exports.uploadDoctorPhoto = asyncHandler(async (req, res, next) => {
  const doctor = await Doctor.findById(req.params.id);

  if (!doctor) {
    return next(
      new ErrorResponse(
        `Doctor profile with id of ${req.params.id} not found`,
        404
      )
    );
  }

  if (!req.files) {
    return next(new ErrorResponse(`Please upload a file`, 400));
  }

  const file = req.files.file;
  //Make sure image is photo
  if (!file.mimetype.startsWith('image')) {
    return next(new ErrorResponse(`Please upload an image file`, 400));
  }
  //check file size
  if (file.size > process.env.MAX_FILE_UPLOAD) {
    return next(
      new ErrorResponse(
        `Please upload an image less than ${process.env.MAX_FILE_UPLOAD}`,
        400
      )
    );
  }
  //Change file name
  file.name = `photo_${doctor._id}${path.parse(file.name).ext}`;

  file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async err => {
    if (err) {
      console.error(err);
      return next(new ErrorResponse('Problem with file upload', 500));
    }

    await Doctor.findByIdAndUpdate(req.params.id, { photo: file.name });
    res.status(200).json({ success: true, data: file.name });
  });
});
